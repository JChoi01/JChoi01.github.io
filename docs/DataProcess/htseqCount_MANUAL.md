---
layout: default
title: Feature counts with htseqCount
parent: Data Process
nav_order: 6
---

© 2022 Janghyun Choi<br>
![Docer](https://img.shields.io/badge/Revised%20version-5%2E15%2E24-green?style=flat&logo=Markdown&colorA=black) [![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-green?labelColor=black)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

# Counting Reads in Features with htseq-count
{: .fs-8 .lh-tight }
HTSeq is a Python library designed to process and analyze data from high-throughput sequencing (HTS) experiments. This tool counts the number of reads mapping to each genomic feature. It requires input files, such as BAM files sorted by name or position, to be provided. To ensure comprehensive analysis and avoid zero-frequency issues, it is crucial to include all relevant input files (e.g., control, treat A, treat B, ... , treat N) consecutively. While this operation did not require high CPU usage, demands higher memory (> 16 Gb) to fast count the reads (i.e. this step takes a very long times, approx. 6 hrs on 12 samples). This protocol was created based on <span style="color: #7253ec;"><b>HTseq version 0.11.1</b></span> running on a system equipped with an Intel 10th generation i9-10910 processor and 48GB of memory. The test environment includes <span style="color: #7253ec;"><b>Python version 3.8.5, SciPy version 1.6.2, NumPy version 1.20.1, and pySam version 0.16.0.1 under macOS 12.4 environment.</b></span>
{: .fs-4 .fw-500 }

# Installation HTSeq
{: .fs-7 .fw-400 .lh-tight } 
![EnvTest](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white) [![gith](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/htseq/htseq) [![githio](https://img.shields.io/badge/GitHub.io-181717?style=flat&logo=github&logoColor=yellow)](https://htseq.readthedocs.io/en/release_0.11.1/count.html) ![CI](https://github.com/htseq/htseq/actions/workflows/ci.yml/badge.svg?branch=main) [![GitHub release](https://img.shields.io/github/v/release/htseq/htseq?labelColor=black)](https://github.com/htseq/htseq/releases)

To install HTSeq via anaconda or PyPI, use the following commands:

```bash
$ conda install -c bioconda htseq
# OR
$ pip install HTSeq
```

## <u>Obtain a Gene Annotated File from Ensembl</u>
{: .fs-5 .fw-400 .lh-tight }
1. Select a desire species in the section of **All genome** from Ensemble website.
2. Click **"Download GTF** (or GTF3)" in the **Gene annotation** section.
3. An FTP server appears where you can download the GTF files.
4. The GTF files that can be used for RNA-seq analysis have the following names: **[species].[species version].[release version].gtf.gz.**
(e.g. human: Homo_sapiens.GRCh38.111.gtf.gz, mouse: Mus_musculus.GRCm39.111.gtf.gz, zebrafish: Danio_rerio.GRCz11.111.gtf.gz)
5. Download and uncompress (optional) it and move desired folder.

<i>Users may find it more convenient to download GTF files for human and mouse transcriptome analysis from "<a href="https://www.gencodegenes.org" target="_blank">gencode</a>".</i>

# Running htseq-count
{: .fs-7 .fw-400 .lh-tight } 
Use the following command to perform counting transcripts in mapped genome with htseq-count:
```bash
$ htseq-count -f <format> --strand=<yes/no> --mode=<mode> -r <name/pos> \
    <input_1.bam>...<input_N> <AnnotateFile.gtf> > <output.txt>
```
In these commands,

| Parameter | Description |
|----|----|
| `-f <format>` | Specifies format of the input data. Possible values are SAM or BAM. |
| `--strand=<strand>` | Specifies whether the data is from a strans-specific assay. Possible value for `<strand>`are `yes`, `no`, and `reverse`. (default: `yes`).|
| `--mode=<mode>` | Mode to handle reads overlapping more than one feature. Possible values for `<mode>` are `union`, `intersection-strict` and `intersection-nonempty` (default: `union`). Several researchers most used as `intersection-nonempty`. <br>**Overlapping methods refer as bellow table.** |
| `-r <order>` | Specifies how the BAM files are sorted. The BAM files used in this operation must be sorted either by name (`name`) or position (`pos`). As 'name' option expects all the alignments to appear in adjacent records in input, most users use `name`. |
| `<input_1.bam>...<input_N>` | Specifies input data, it is separated by **spaces**. |
| `<AnnotateFile.gtf>` | For count the reads, must be required gene annotation files as a GTF format.  |
| `> <output.txt>` | Specifies output file, this file generates as a plain text file. `>` symbol must appear before the `<output.txt>` syntax. |

## <u>Overlapping Table</u>
{: .fs-5 .fw-400 .lh-tight }
The following table illustrates the effect of these three modes (`union`, `intersection-strict` and `intersection-nonempty`) :
<div style="text-align: center;">
  <img src="https://htseq.readthedocs.io/en/release_0.11.1/_images/count_modes.png" width="60%" height="auto">
</div>

## <u>Example Code</u>
{: .fs-5 .fw-400 .lh-tight }
Here is an example command to perform htseq-count with the zebrafish genome on 4 samples:
```bash
$ htseq-count -f bam --strand=no --mode=intersection-nonempty -r name \
    sort_MA_rep1.bam sort_MA_rep2.bam sort_Y_rep1.bam sort_Y_rep2.bam \
    /Users/jchoi/Desktop/Danio_rerio.GRCz11.111.gtf > /Users/jchoi/Desktop/Age.txt 
```
- When htseq-count is running, it will print out the progress in real time. The output is very long, so I will not describe it.

{% include code_input_box.html %}

# Citation
{: .fs-7 .fw-400 .lh-tight } 

<div style="border: 2px solid #b19cd9; border-radius: 15px; padding: 15px; margin: 20px; text-align: left; font-size: 1em; line-height: 1.5; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <span class="label label-purple" style="display: inline-block; margin-bottom: 10px; position: relative; left: -10px;">HTSeq</span>
    <ol style="padding-left: 40px;">
        <li style="margin-bottom: 10px;">
            <span><b>Anders, S.</b>, Pyl, P. T., & Huber, W. (2015). HTSeq—a Python framework to work with high-throughput sequencing data. <i>bioinformatics</i>, 31(2), 166-169. <a href="https://doi.org/10.1093/bioinformatics/btu638" target="_blank">DOI</a></span>
        </li>
    </ol>
</div>