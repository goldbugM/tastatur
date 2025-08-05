#!/usr/bin/env python3
"""
Comprehensive script to update all remaining instances of "mkboard.com" to "mkboard.com" in the codebase.
"""

import os
import re
import sys

def update_file_content(file_path, replacements):
    """Update file content with the given replacements."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all replacements
        for old_text, new_text in replacements:
            content = content.replace(old_text, new_text)
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
            return True
        else:
            return False
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    """Main function to update all files."""
    base_dir = r"c:\Users\mb\Desktop\mkboard.com-master"
    
    # Define all the replacements needed
    replacements = [
        ("keybr.com", "mkboard.com"),
        ("keybr\\.com", "mkboard.com"),  # For regex patterns
    ]
    
    # Files to update with their specific paths
    files_to_update = [
        # Test files
        "packages/mkboard-multiplayer-ui/lib/Connector.test.tsx",
        "packages/mkboard-database/lib/model.test.ts",
        "packages/mkboard-pages-browser/lib/NavMenu.test.tsx",
        "packages/mkboard-pages-server/lib/Shell.test.tsx",
        "packages/server/lib/app/settings/controller.test.ts",
        "packages/server/lib/app/sitemap/controller.test.ts",
        "packages/mkboard-database/lib/testing.ts",
        "packages/server/lib/app/sync/controller.test.ts",
        "packages/server/lib/app/auth/auth-oauth.test.ts",
        "packages/server/lib/app/auth/auth-email.test.ts",
        "packages/page-account/lib/AccountPage.test.tsx",
        "packages/page-account/lib/AccountSection.test.tsx",
        "packages/server/lib/app/auth/auth.test.ts",
        "packages/server/lib/app/page/controller.test.ts",
        "packages/mkboard-pages-browser/lib/Template.test.tsx",
        "packages/mkboard-pages-browser/lib/SubMenu.test.tsx",
        
        # Configuration files
        "packages/devenv/etc/container/tls.sh",
        "root/etc/nginx/sites-available/www.mkboard.com.conf",
        
        # Font files
        "packages/mkboard-themes/Whitespace-em2000.sfd",
        "packages/mkboard-themes/Whitespace-em2048.sfd",
        "packages/mkboard-themes/Whitespace-em1000.sfd",
        
        # Terms of service
        "packages/page-static/lib/terms-of-service.html.ts",
    ]
    
    print("Starting comprehensive mkboard.com update process...")
    
    updated_count = 0
    
    for file_path in files_to_update:
        full_path = os.path.join(base_dir, file_path)
        if os.path.exists(full_path):
            if update_file_content(full_path, replacements):
                updated_count += 1
        else:
            print(f"File not found: {full_path}")
    
    print(f"\nUpdate process completed. {updated_count} files were updated.")
    
    # Also handle the nginx symlink
    symlink_path = os.path.join(base_dir, "root/etc/nginx/sites-enabled/www.mkboard.com.conf")
    if os.path.exists(symlink_path):
        print(f"Note: Symlink found at {symlink_path} - this may need manual attention")

if __name__ == "__main__":
    main()