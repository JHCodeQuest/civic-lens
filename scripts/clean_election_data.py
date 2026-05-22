#!/usr/bin/env python3
"""Clean and normalise election result data."""

import csv
import sys


def main(input_path: str, output_path: str) -> None:
    with open(input_path, newline="") as infile, open(output_path, "w", newline="") as outfile:
        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames or [])
        writer.writeheader()
        for row in reader:
            row = {k.strip(): v.strip() for k, v in row.items()}
            writer.writerow(row)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
