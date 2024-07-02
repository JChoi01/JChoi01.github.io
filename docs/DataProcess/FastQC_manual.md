---
layout: default
title: Basal Quality Control with FastQC
parent: Data Process
nav_order: 1
---

© 2022 Janghyun Choi<br>
![Docer](https://img.shields.io/badge/Revised%20version-5%2E15%2E24-green?style=flat&logo=Markdown&colorA=black) [![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-green?labelColor=black)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

# Quality Check (QC) on Sequencing Files with FastQC
{: .fs-8 .lh-tight }
This part performs the quality check (QC) on fastq sequencing files, which are received from the sequencing facility. The fastq files store raw sequencing data, capturing both the nucleotide sequence and its corresponding quality score. Various QC tools have been developed and modified, although we still recommend using FastQC originated by Babraham Bioinformatics. As FastQC is based on GUI, it can be easily accessible and intuitive. However, GUI-based FastQC provides single-core processing. To operate with multithreaded processing, python-coded FastQC is required. This protocol was created based on <span style="color: #7253ec;"><b>FastQC version 0.11.9</b></span> running on a system equipped with an Intel 10th generation i9-10910 processor and 48GB of memory. The test environment includes <span style="color: #7253ec;"><b>*Python version 3.8.5 under macOS 12.4 environment.</b></span>
{: .fs-4 .fw-500 }

# Viewing a fastq File
{: .fs-7 .fw-400 .lh-tight }

To understand the structure of fastq files, you can use the following commands:
```bash    
$ gzip -cd <filenames.gz> | head -n <int> # <int>: Specify the number of lines to output.

# for example
$ gzip -cd shCon_Unt_1.fastq.gz | head -n 6
$ gzip -cd shCon_Unt_1.fastq.gz | tail -n 10
```
    
## <u>Output</u>
{: .fs-5 .fw-400 .lh-tight }
When gzip finished typing, it prints messages showing fastq file look like this:
```bash
$ gzip -cd shCon_Unt_1.fastq.gz | head -n 4
@A00718:626:HH5N7DSXC:3:1101:2067:1000 1:N:0:TTCTATAC+GGTTCCAA                                          # Line 1
NCCGCCGCCGACCACCAGAATACAGCTGTACATCTTACGCTTCGTCTCGTCCGACGCACAGGAGTCGATGCTGTGCAGGATGGCTTTATCGATGCCCAGAG   # Line 2
+                                                                                                       # Line 3
%FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF   # Line 4
```
In this result,

- Line 1 specifies **“Header Line”** that contains the sequencing information, including platform ID, flow cell ID/coordinated, filtering, multiplex sequence.
- Line 2 specifies **“Sequence Line”** that represents the actual cDNA sequence. The letter “N” is used when a specific base cannot be determined.
- Line 3 specifies **“Plus Line”** that contains just a “+”, and this is ignored.
- Line 4 specifies **“Quality Score Line”** that displays the quality scores for each base as ASCII characters.

# Installation FastQC
{: .fs-7 .fw-400 .lh-tight }
![EnvTest](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white) ![EnvTest](https://img.shields.io/badge/Ubuntu-E95420?style=flat&logo=ubuntu&logoColor=white) [![gith](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/s-andrews/FastQC) [![web](https://img.shields.io/badge/Official-e34c26?style=flat&logo=html5&logoColor=white)](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/) [![GitHub release](https://img.shields.io/github/v/release/s-andrews/FastQC?labelColor=black)](https://github.com/s-andrews/FastQC/releases) ![Status](https://img.shields.io/badge/status-stable-DarkSeaGreen?labelColor=black)

To install FastQC via homebrew, use the following commands:
```bash    
$ brew install fastqc
```

# Running FastQC
{: .fs-7 .fw-400 .lh-tight }
Use the following command to perform QC with FastQC:
    
```bash
$ fastqc -o <output_folder> -f <format> -t <int> <input-1> ... <input-N>
```

In these commands:
- `-o <output_folder>`: Specifies the output folder.
- `-f <format>`: Specifies the input file types.
- `-t <int>`: Specifies the number of threads used in this operation.
- `<input-1> ... <input-N>`: Specifies the input data, it is must be separated by **spaces**.

## <u>Example Code</u>
{: .fs-5 .fw-400 .lh-tight }
Here is an example command to perform QC on multiple fastq files:
```bash
$ fastqc -o ~/Desktop/Fastq/FastQC/ -f fastq -t 10 \
    shCon_H2O2_1.fastq.gz shCon_Unt_1.fastq.gz shMLL1_NP_1.fastq.gz shNRF2_H2O2_1.fastq.gz \
    shNRF2_Unt_1.fastq.gz shUTX_NP_1.fastq.gz shCon_H2O2_2.fastq.gz shCon_Unt_2.fastq.gz \
    shMLL1_NP_2.fastq.gz shNRF2_H2O2_2.fastq.gz shNRF2_Unt_2.fastq.gz shUTX_NP_2.fastq.gz \
    shCon_NP_1.fastq.gz shMLL1_H2O2_1.fastq.gz shMLL1_Unt_1.fastq.gz shNRF2_NP_1.fastq.gz \
    shUTX_H2O2_1.fastq.gz shUTX_Unt_1.fastq.gz shCon_NP_2.fastq.gz shMLL1_H2O2_2.fastq.gz \
    shMLL1_Unt_2.fastq.gz shNRF2_NP_2.fastq.gz shUTX_H2O2_2.fastq.gz shUTX_Unt_2.fastq.gz
```
Open the `name_fastqc.html` file that is created in the output folder to check the QC information.

# Installation MultiQC
{: .fs-7 .fw-400 .lh-tight }
![EnvTest](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white) [![gith](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/MultiQC/MultiQC) [![web](https://img.shields.io/badge/Official-e34c26?style=flat&logo=html5&logoColor=white)](http://multiqc.info) [![PyPI Version](https://img.shields.io/pypi/v/multiqc?labelColor=black)](https://pypi.python.org/pypi/multiqc/) ![Status](https://img.shields.io/badge/status-stable-DarkSeaGreen?labelColor=black)

MultiQC is a tool to create a single report with interactive plots for multiple bioinformatics analyses across many samples. Reports are generated by scanning given directories for recognised log files. These are parsed and a single HTML report is generated summarising the statistics for all logs found. To install multiqc via PyPI, use the following command:
```bash    
$ pip install multiqc
```

## <u>Export Report via multiqc</u>
{: .fs-5 .fw-400 .lh-tight }
Once installed, you can use `multiqc` by navigating to your analysis directory (or a parent directory) and running the tool:
```bash 
$ multiqc ./
```
That is it. `multiqc` will scan the specified directory (`.` is the current dir) and produce a report detailing whatever it finds.

# Citations
{: .fs-7 .fw-400 .lh-tight }

<div style="border: 2px solid #b19cd9; border-radius: 15px; padding: 15px; margin: 20px; text-align: left; font-size: 1em; line-height: 1.5; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <span class="label label-purple" style="display: inline-block; margin-bottom: 10px; position: relative; left: -10px;">FastQC</span>
    <ol style="padding-left: 40px;">
        <li style="margin-bottom: 10px;">
            <span><b>Andrews, S.</b>, Krueger, F., Segonds-Pichon, A., Biggins, L., Krueger, C., & Wingett, S. (2010). FastQC. A quality control tool for high throughput sequence data, 370.</span>
        </li>
    </ol>
    <span class="label label-purple" style="display: inline-block; margin-bottom: 10px; position: relative; left: -10px;">MultiQC</span>
    <ol style="padding-left: 40px;">    
        <li style="margin-bottom: 10px;">
            <span><b>Ewels, P.</b>, Magnusson, M., Lundin, S., & Käller, M. (2016). MultiQC: summarize analysis results for multiple tools and samples in a single report. <i>Bioinformatics</i>, 32(19), 3047-3048. <a href="https://doi.org/10.1093/bioinformatics/btw354" target="_blank">DOI</a></span>
        </li>
    </ol>
</div>