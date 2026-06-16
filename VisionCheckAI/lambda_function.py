import json
import boto3
import base64
import logging

logger = logging.getLogger()
logger.setLevel(logging.ERROR)

bedrock_client = boto3.client('bedrock-runtime', region_name='us-east-1')

ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
MAX_IMAGE_SIZE = 5 * 1024 * 1024

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        image_data = body.get('image')
        content_type = body.get('content_type', 'image/jpeg')

        if not image_data:
            return build_response(400, {'error': 'No image provided'})

        if content_type not in ALLOWED_TYPES:
            return build_response(400, {'error': 'Invalid file type. Please upload JPEG, PNG or WebP only.'})

        try:
            image_bytes = base64.b64decode(image_data)
        except Exception:
            return build_response(400, {'error': 'Invalid image data'})

        if len(image_bytes) > MAX_IMAGE_SIZE:
            return build_response(400, {'error': 'Image too large. Maximum size is 5MB.'})

        analysis = analyze_image_with_bedrock(image_data, content_type)
        return build_response(200, {'success': True, 'analysis': analysis})

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return build_response(500, {'error': 'Something went wrong. Please try again.'})


def analyze_image_with_bedrock(image_data, content_type):
    prompt = "You are a workplace safety inspector AI. Analyze this workplace image and provide a structured safety report covering: 1. PPE COMPLIANCE - Check for hard hat, safety vest, gloves, safety boots, eye protection. 2. VIOLATIONS FOUND - List any missing or improper PPE. 3. RISK LEVEL - Rate as LOW, MEDIUM, HIGH, or CRITICAL. 4. RECOMMENDATIONS - Specific actions to improve safety. Be direct and professional. If this is not a workplace image, state that clearly."

    try:
        response = bedrock_client.invoke_model(
            modelId='us.anthropic.claude-sonnet-4-5-20250929-v1:0',
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1000,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image",
                                "source": {
                                    "type": "base64",
                                    "media_type": content_type,
                                    "data": image_data
                                }
                            },
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ]
            })
        )
        result = json.loads(response['body'].read())
        return result['content'][0]['text']

    except Exception as e:
        logger.error(f"Bedrock error: {str(e)}")
        raise Exception("AI analysis failed. Please try again.")


def build_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        'body': json.dumps(body)
    }
