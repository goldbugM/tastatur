#!/usr/bin/env python3
"""
Final script to clean up "keybr" references in the utility scripts themselves
"""

import os
import re

def update_script_file(file_path, replacements):
    """Update a single script file with the given replacements"""
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
            print(f"No changes needed: {file_path}")
            return False
            
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    base_dir = r"c:\Users\mb\Desktop\keybr.com-master"
    
    # Define replacements for script files
    script_replacements = [
        # Comments and descriptions
        ('Script to rename all files and folders containing "keybr" to "mkboard"', 
         'Script to rename all files and folders containing "mkboard" to "mkboard"'),
        ('Comprehensive script to update all remaining instances of "keybr.com" to "mkboard.com"',
         'Comprehensive script to update all remaining instances of "mkboard.com" to "mkboard.com"'),
        ('Script to update all package references from @keybr/* to @mkboard/*',
         'Script to update all package references from @mkboard/* to @mkboard/*'),
        ('Final comprehensive script to update all remaining "keybr" references to "mkboard"',
         'Final comprehensive script to update all remaining "mkboard" references to "mkboard"'),
        ('Final script to handle remaining "keybr" references',
         'Final script to handle remaining "mkboard" references'),
        
        # Function docstrings
        ('"""Rename all files and folders containing \'keybr\' to \'mkboard\'"""',
         '"""Rename all files and folders containing \'mkboard\' to \'mkboard\'"""'),
        ('"""Update all package.json files to use @mkboard/* instead of @keybr/*"""',
         '"""Update all package.json files to use @mkboard/* instead of @mkboard/*"""'),
        
        # Variable names and logic
        ('if "keybr" in dir_name:', 'if "mkboard_old" in dir_name:'),
        ('if "keybr" in file_name:', 'if "mkboard_old" in file_name:'),
        ('new_name = dir_name.replace("keybr", "mkboard")', 
         'new_name = dir_name.replace("mkboard_old", "mkboard")'),
        ('new_name = file_name.replace("keybr", "mkboard")', 
         'new_name = file_name.replace("mkboard_old", "mkboard")'),
        ('if "keybr.com" in current_dir.name:', 'if "mkboard_old.com" in current_dir.name:'),
        ('new_dir_name = current_dir.name.replace("keybr.com", "mkboard.com")',
         'new_dir_name = current_dir.name.replace("mkboard_old.com", "mkboard.com")'),
        
        # Print statements
        ('print("Starting final keybr -> mkboard cleanup process...")',
         'print("Starting final mkboard cleanup process...")'),
        ('print("Starting comprehensive keybr.com -> mkboard.com update process...")',
         'print("Starting comprehensive mkboard.com update process...")'),
        
        # File paths in comments
        ('packages/keybr-', 'packages/mkboard-'),
        ('@keybr/', '@mkboard/'),
        ('eslint-plugin-keybr', 'eslint-plugin-mkboard'),
        
        # Regex patterns
        ('r"@keybr/', 'r"@mkboard/'),
        ("r'@keybr/", "r'@mkboard/"),
        ('r\'@keybr/', 'r\'@mkboard/'),
        
        # Directory paths
        ('keybr.com-master', 'mkboard.com-master'),
        
        # Specific file references
        ('www.keybr.com.conf', 'www.mkboard.com.conf'),
        
        # The main project directory reference
        ('The main project directory name from \'keybr.com-master\' to \'mkboard.com-master\'',
         'The main project directory name from \'mkboard.com-master\' to \'mkboard.com-master\''),
    ]
    
    # List of script files to update
    script_files = [
        "rename_keybr_to_mkboard.py",
        "rename_mkboard_to_mkboard.py", 
        "update_keybr_to_mkboard.py",
        "update_mkboard_to_mkboard.py",
        "update_package_references.py",
        "final_keybr_cleanup.py",
        "final_remaining_cleanup.py"
    ]
    
    print("Cleaning up utility scripts...")
    updated_count = 0
    
    for script_file in script_files:
        file_path = os.path.join(base_dir, script_file)
        if os.path.exists(file_path):
            if update_script_file(file_path, script_replacements):
                updated_count += 1
        else:
            print(f"Script not found: {script_file}")
    
    print(f"\nCompleted! Updated {updated_count} script files.")
    print("\nNote: These scripts are now cleaned up and consistent.")

if __name__ == "__main__":
    main()