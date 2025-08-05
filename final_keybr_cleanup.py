#!/usr/bin/env python3
"""
Final comprehensive script to update all remaining "mkboard" references to "mkboard"
"""

import os
import re
import glob

def update_file_content(file_path, replacements):
    """Update file content with the given replacements"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all replacements
        for old_text, new_text in replacements:
            content = content.replace(old_text, new_text)
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    base_dir = r"c:\Users\mb\Desktop\mkboard.com-master"
    
    # Define replacements
    replacements = [
        # Database and service references
        ("keybr", "mkboard"),
        ("@mkboard/", "@mkboard/"),
        ("packages/mkboard-", "packages/mkboard-"),
        ("eslint-plugin-mkboard", "eslint-plugin-mkboard"),
        ("/var/lib/keybr", "/var/lib/mkboard"),
        ("/etc/keybr", "/etc/mkboard"),
        ("/opt/keybr", "/opt/mkboard"),
        ("/tmp/keybr", "/tmp/mkboard"),
        ("keybr-backup-database", "mkboard-backup-database"),
        ("keybr-remove-sessions", "mkboard-remove-sessions"),
        ("keybr.service", "mkboard.service"),
        ("keybr.js", "mkboard.js"),
        ("keybr master process", "mkboard master process"),
        ("keybr server worker process", "mkboard server worker process"),
        ("keybr game server worker process", "mkboard game server worker process"),
        ("keybr_tests", "mkboard_tests"),
        ("keybr-com", "mkboard-com"),
        ("keybr-check-stats", "mkboard-check-stats"),
        ("keybr-build-histogram", "mkboard-build-histogram"),
        ("keybr.theme", "mkboard.theme"),
        (".keybr-theme", ".mkboard-theme"),
        ("namespace keybr", "namespace mkboard"),
        ("} // namespace keybr", "} // namespace mkboard"),
        ("keybr::", "mkboard::"),
        ("info@keybr.no", "info@mkboard.no"),
        ("redirect from keybr to provider", "redirect from mkboard to provider"),
        ("redirect from provider to keybr", "redirect from provider to mkboard"),
        ("DEFAULT_ROOT", "DEFAULT_ROOT"),  # Keep this as is for now
    ]
    
    # Files to update
    files_to_update = [
        # SQL and database files
        "root/etc/sql/create-schema.sh",
        "root/etc/sql/create-schema.sql",
        "root/etc/sql/create-database.sql",
        "root/etc/sql/dump-schema.sh",
        "root/etc/sql/backup-database.sh",
        
        # Service and configuration files
        "root/etc/mkboard.service",
        "root/etc/mkboard-backup-database.service",
        "root/etc/mkboard-backup-database.sh",
        "root/etc/mkboard-remove-sessions.service",
        "root/etc/mkboard-remove-sessions.sh",
        "root/etc/dirs.sh",
        "root/etc/configure.sh",
        "root/mkboard.js",
        "root/package.json",
        
        # Nginx configuration
        "root/etc/nginx/sites-available/www.mkboard.com.conf",
        
        # Test environment files
        "packages/test-env-server/lib/index.ts",
        
        # Configuration files
        "packages/mkboard-config/lib/knex.ts",
        "packages/mkboard-config/lib/env.ts",
        "packages/mkboard-config/lib/module.ts",
        "packages/mkboard-config/lib/datadir.test.ts",
        
        # Server files
        "packages/server/lib/main.ts",
        "packages/server-cli/lib/main.ts",
        "packages/server/lib/app/auth/auth-oauth.test.ts",
        
        # User data tools (C++ files)
        "packages/user-data-tools/stats_file_name.cpp",
        "packages/user-data-tools/stats_file_name.hpp",
        "packages/user-data-tools/stats_data.cpp",
        "packages/user-data-tools/stats_data.hpp",
        "packages/user-data-tools/stats_result.cpp",
        "packages/user-data-tools/stats_result.hpp",
        "packages/user-data-tools/circ_buffer.hpp",
        "packages/user-data-tools/mkboard-check-stats.cpp",
        "packages/user-data-tools/mkboard-build-histogram.cpp",
        "packages/user-data-tools/Makefile",
        "packages/user-data-tools/.gitignore",
        
        # Theme files
        "packages/mkboard-themes/lib/themes/theme-io.ts",
        "packages/mkboard-themes/lib/themes/theme-io.test.ts",
        "packages/mkboard-theme-designer/lib/io/constants.ts",
        
        # Generator files
        "packages/mkboard-generators/lib/generate-layouts.ts",
        "packages/mkboard-generators/lib/generate-books.ts",
        "packages/mkboard-generators/lib/generate-languages.ts",
        
        # Test files
        "packages/mkboard-result-userdata/lib/factory.test.ts",
        "packages/mkboard-result-userdata/lib/userdata.test.ts",
        "packages/mkboard-settings-database/lib/index.test.ts",
        "packages/mkboard-highscores/lib/factory.test.ts",
        "packages/server-cli/lib/command/stats/fix-file.test.ts",
        
        # Translation files
        "packages/mkboard-intl/translations/nb.json",
        
        # Third party files
        "packages/thirdparties-ads/lib/scripts.ts",
        "packages/thirdparties/lib/ads.tsx",
        
        # Build and configuration files
        "webpack.config.js",
        "scripts/lib/intl-io.js",
        
        # TSL files
        "packages/tsl/tstest",
        "packages/tsl/tsnode",
    ]
    
    print("Starting final mkboard cleanup process...")
    
    updated_count = 0
    
    for file_path in files_to_update:
        full_path = os.path.join(base_dir, file_path)
        if os.path.exists(full_path):
            if update_file_content(full_path, replacements):
                print(f"Updated: {file_path}")
                updated_count += 1
        else:
            print(f"File not found: {file_path}")
    
    # Also update package-lock.json with special handling
    package_lock_path = os.path.join(base_dir, "package-lock.json")
    if os.path.exists(package_lock_path):
        # For package-lock.json, we need to be more careful
        package_lock_replacements = [
            ('"@mkboard/', '"@mkboard/'),
            ("packages/mkboard-", "packages/mkboard-"),
            ('"name": "@mkboard/', '"name": "@mkboard/'),
            ('"resolved": "packages/mkboard-', '"resolved": "packages/mkboard-'),
        ]
        if update_file_content(package_lock_path, package_lock_replacements):
            print(f"Updated: package-lock.json")
            updated_count += 1
    
    print(f"\nFinal cleanup completed! Updated {updated_count} files.")
    print("\nNote: You may need to manually update:")
    print("1. The main project directory name from 'mkboard.com-master' to 'mkboard.com-master'")
    print("2. Any remaining hardcoded paths in deployment scripts")
    print("3. Database name in production environments")

if __name__ == "__main__":
    main()