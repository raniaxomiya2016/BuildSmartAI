#!/bin/bash

# HerCare Voice Deployment Script
# Author: Rani Neog Adhikary - BuildSmart AI

echo "=================================================="
echo " Starting HerCare Voice Netlify Deployment"
echo "=================================================="

# Check if netlify is authenticated
npx netlify status &>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️  You are not logged in to Netlify CLI."
    echo "Starting login process..."
    npx netlify login
    if [ $? -ne 0 ]; then
        echo "❌ Login failed. Exiting."
        exit 1
    fi
fi

echo "✅ Authenticated with Netlify."

# Create site if not already created
echo "Creating Netlify site 'hercare-voice-buildsmart'..."
SITE_INFO=$(npx netlify sites:create --name hercare-voice-buildsmart --json 2>/dev/null)

if [ $? -ne 0 ]; then
    # If the name is already taken or site already exists, let's list sites and find the ID
    echo "Site name might be taken or already exists. Checking your sites..."
    SITE_ID=$(npx netlify sites:list --json 2>/dev/null | grep -B 1 -A 5 '"name": "hercare-voice-buildsmart"' | grep '"id":' | head -n 1 | awk -F'"' '{print $4}')
    
    if [ -z "$SITE_ID" ]; then
        # Try a fallback name
        echo "Fallback: Creating site with a unique random name..."
        SITE_INFO=$(npx netlify sites:create --json)
        SITE_ID=$(echo "$SITE_INFO" | grep '"id":' | head -n 1 | awk -F'"' '{print $4}')
        SITE_NAME=$(echo "$SITE_INFO" | grep '"name":' | head -n 1 | awk -F'"' '{print $4}')
        echo "Created site: $SITE_NAME ($SITE_ID)"
    else
        echo "Found existing site 'hercare-voice-buildsmart' with ID: $SITE_ID"
    fi
else
    SITE_ID=$(echo "$SITE_INFO" | grep '"id":' | head -n 1 | awk -F'"' '{print $4}')
    echo "Successfully created site with ID: $SITE_ID"
fi

if [ -z "$SITE_ID" ]; then
    echo "❌ Could not retrieve Site ID. Exiting."
    exit 1
fi

# Deploy files
echo "Deploying files to production..."
npx netlify deploy --prod --dir=. --site="$SITE_ID"

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed."
    exit 1
fi

# Set custom domain
echo "Configuring custom domain hercare.buildsmartai.app..."
npx netlify api updateSite --site_id "$SITE_ID" --data '{"custom_domain": "hercare.buildsmartai.app"}' &>/dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Could not set custom domain automatically via API."
    echo "You can set it manually in the Netlify Dashboard at:"
    echo "https://app.netlify.com/sites/hercare-voice-buildsmart/settings/domain"
else
    echo "✅ Custom domain hercare.buildsmartai.app successfully mapped!"
fi

echo "=================================================="
echo " 🎉 Deployment Complete!"
echo " Website: https://hercare.buildsmartai.app"
echo "=================================================="
