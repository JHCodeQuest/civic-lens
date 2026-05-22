#!/usr/bin/env python3
"""Import constituency data into the database."""

import csv
import sys


def main(csv_path: str) -> None:
    with open(csv_path, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            print(f"Importing: {row.get('name', 'unknown')}")


if __name__ == "__main__":
    main(sys.argv[1])
