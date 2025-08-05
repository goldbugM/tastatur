#!/usr/bin/env python3
"""
Script to rename all files and folders containing "mkboard" to "mkboard"
"""

import os
import shutil
import sys
from pathlib import Path

def rename_files_and_folders():
    """Rename all files and folders containing 'mkboard' to 'mkboard'"""
    
    base_dir = Path.cwd()
    print(f"Starting rename process in: {base_dir}")
    
    # First, collect all items that need renaming
    items_to_rename = []
    
    # Walk through all directories and files
    for root, dirs, files in os.walk(base_dir):
        root_path = Path(root)
        
        # Check directories
        for dir_name in dirs:
            if "mkboard_old" in dir_name:
                old_path = root_path / dir_name
                new_name = dir_name.replace("mkboard_old", "mkboard")
                new_path = root_path / new_name
                items_to_rename.append(("dir", old_path, new_path))
        
        # Check files
        for file_name in files:
            if "mkboard_old" in file_name:
                old_path = root_path / file_name
                new_name = file_name.replace("mkboard_old", "mkboard")
                new_path = root_path / new_name
                items_to_rename.append(("file", old_path, new_path))
    
    # Sort by depth (deepest first) to avoid issues with nested renames
    items_to_rename.sort(key=lambda x: len(str(x[1]).split(os.sep)), reverse=True)
    
    print(f"Found {len(items_to_rename)} items to rename:")
    
    renamed_count = 0
    for item_type, old_path, new_path in items_to_rename:
        try:
            if old_path.exists():
                print(f"Renaming {item_type}: {old_path.relative_to(base_dir)} -> {new_path.relative_to(base_dir)}")
                old_path.rename(new_path)
                renamed_count += 1
            else:
                print(f"Skipping {item_type} (already renamed or doesn't exist): {old_path.relative_to(base_dir)}")
        except Exception as e:
            print(f"Error renaming {old_path}: {e}")
    
    print(f"\nRename process completed. Successfully renamed {renamed_count} items.")
    
    # Special case: The main project folder itself
    current_dir = Path.cwd()
    if "mkboard_old.com" in current_dir.name:
        parent_dir = current_dir.parent
        new_dir_name = current_dir.name.replace("mkboard_old.com", "mkboard.com")
        new_dir_path = parent_dir / new_dir_name
        print(f"\nNote: The main project directory '{current_dir.name}' should be renamed to '{new_dir_name}'")
        print(f"You may need to manually rename it from '{current_dir}' to '{new_dir_path}'")

if __name__ == "__main__":
    try:
        rename_files_and_folders()
    except KeyboardInterrupt:
        print("\nOperation cancelled by user.")
        sys.exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)