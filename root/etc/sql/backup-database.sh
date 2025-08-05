#!/usr/bin/env bash

# To restore the database:
# $ cat dumpfilename.sql | mysql -u root mkboard
# or
# $ bzcat dumpfilename.sql.bz2 | mysql -u root mkboard

mysqldump -u root mkboard | bzip2 -c > /var/lib/mkboard/backups/database.sql.bz2
