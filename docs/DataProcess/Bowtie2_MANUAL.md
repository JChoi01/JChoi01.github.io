---
layout: default
title: Mapping reads with Bowtie2 for ChIP-seq
parent: Data Process
nav_order: 4
---

© 2022 Janghyun Choi<br>
![Docer](https://img.shields.io/badge/Revised%20version-5%2E15%2E24-green?style=flat&logo=Markdown&colorA=black) [![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-green?labelColor=black)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

# Alignment with Reference Genome using bowtie2
{: .fs-8 .lh-tight }
Bowtie2 that is an ultrafast and memory-efficient tool coded in python can be aligned sequencing reads to long reference genomes. Notably, <span style="color: #7253ec;"><b>Bowtie is suitable for ChIP-seq or ATAC-seq, but not RNA-seq.</b></span> If you have to analyze transcriptome, go to the section on RNA-seq using HISAT2 tool. Bowtie can run on any computer installed on Linux or macOS and works in python version > 2.6. This protocol was created based on <span style="color: #7253ec;"><b>Bowtie2 version 2.5.1</b></span> running on a system equipped with an Intel 10th generation i9-10910 processor and 48GB of memory. The test environment includes <span style="color: #7253ec;"><b>Python version 3.8.5, SciPy version 1.6.2, NumPy version 1.20.1, and pySam version 0.16.0.1 under macOS 12.4 environment. This course takes very long time and spends a lot of RAM and CPU resource.</b></span>
{: .fs-4 .fw-500 }

# Installation bowtie2
{: .fs-7 .fw-400 .lh-tight } 
![EnvTest](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white) ![EnvTest](https://img.shields.io/badge/Ubuntu-E95420?style=flat&logo=ubuntu&logoColor=white) [![gith](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/BenLangmead/bowtie2) ![Random Tests](https://github.com/BenLangmead/bowtie2/actions/workflows/random-tests.yml/badge.svg) ![Simple Tests](https://github.com/BenLangmead/bowtie2/actions/workflows/simple-tests.yml/badge.svg) [![web](https://img.shields.io/badge/Official-e34c26?style=flat&logo=html5&logoColor=white)](https://bowtie-bio.sourceforge.net/bowtie2/index.shtml) [![GitHub release](https://img.shields.io/github/v/release/BenLangmead/bowtie2?labelColor=black)](https://github.com/BenLangmead/bowtie2/releases) ![Status](https://img.shields.io/badge/status-stable-DarkSeaGreen?labelColor=black)

To install bowtie2 using homebrew, use the following command:

```bash
$ brew install bowtie2
```

## <u>Establish Genome Builder</u>
{: .fs-6 .fw-400 .lh-tight }
`bowtie2-build` builds a bowtie index from a set of DNA sequence. This builder consists of a set of 6 files with suffixes `.1.bt2`, `.2.bt2`, `.3.bt2`, `.4.bt2`, `.rev.1.bt2`, and `.rev.2.bt2`. These files together constitute the index for the alignment reads to that reference. You can download from the index section of official website all the files for a given assembly as a single zip file, or as 6 seperate bt2 files. There are two types of genome builder method; manual and automatic.
1. Automatic method: uncompress builder files and uses 'bowtie2-build' or 'make_XX_.sh' syntax. For more information, refer to Bowtie2's manual.
2. Manual method: uncompress builder files and moves them to the desired path.

{: .note }
the build step is a prerequisite for the main sequence. Unlike "HISAT2", this tool provides index files for most species from the index zone of official site.

# Running bowtie2
{: .fs-7 .fw-400 .lh-tight } 
Use the following command to perform mapping to the genome with bowtie2:
```bash
# Usage for single-end
$ bowtie2 -x <GenomeBuilder> -U <reads.fq> -S <output.sam> --<mode> --<preset> -p <int>

# Usage for pair-end
$ bowtie2 -x <GenomeBuilder> -1 <forward_reads.fq> -2 <reverse_reads.fq> \
        -S <output.sam> --<mode> --<preset> -p <int>
```
In these commands,

| Parameter | Description |
|----|----|
|`-x <GenomeBuilder>` | Specifies the reference genome as the builder format. |
|`-U <reads.fq>` (only SE mode) | Specifies input read sequence. Possible file types is fastq formats (fastq or fq). |
|`-1` and `-2` (only PE mode) | Specifies forward input read and reverse input read, respectively. |
|`-S <output.sam>` | Specifies output file. |
|`--<mode>>` option | Bowtie2 provides two algorithms for maaping reads to the genome. The end-to-end mode (`--end-to-end`, default) aligns the entire length of reads to the reference genome, utilizing all available information. In contrast, the local mode (`--local`) flexibly aligns only the best-matching segments of reads to the reference, which is especially useful when the quality of reads is uneven. For more information, refer to Bowtie2's manual. **This manual provides the local algorithm.**|
| `--<preset>` option | Specifies preset options for the mapping algorithm. Possivle presers for the local mode are `--very-fast-local`, `--fast-local`, `--sensitive-local` (default) or `--very-sensitive-local`. For more information, refer to Bowtie2's manual. |
|`-p <int>` | number of processors to use in addition to main thread <int>. |

## <u>Example Code</u>
{: .fs-5 .fw-400 .lh-tight }
Here is an example command to perform alignment with the mouse mm10 genome on trimmed fastq files:
```bash
$ bowtie2 -x /Users/jchoi/Desktop/mm10/mm10 \
    -1 /Users/jchoi/Desktop/Trim/Trim_pair_NFIB_1.fq.gz \
    -2 /Users/jchoi/Desktop/Trim/Trim_pair_NFIB_2.fq.gz \
    -S /Users/jchoi/Desktop/NFIB.sam --local --very-fast-local -p 20
```

{% include code_input_box.html %}

## <u>Output</u>
{: .fs-5 .fw-400 .lh-tight }
When bowtie2 finishes running, it prints messages summarizing what happened.
```
23156585 reads; of these:
  23156585 (100.00%) were paired; of these:
    2044536 (8.83%) aligned concordantly 0 times
    11769262 (50.82%) aligned concordantly exactly 1 time
    9342787 (40.35%) aligned concordantly >1 times
    ----
    2044536 pairs aligned concordantly 0 times; of these:
      686243 (33.56%) aligned discordantly 1 time
    ----
    1358293 pairs aligned 0 times concordantly or discordantly; of these:
      2716586 mates make up the pairs; of these:
        1327258 (48.86%) aligned 0 times
        453087 (16.68%) aligned exactly 1 time
        936241 (34.46%) aligned >1 times
97.13% overall alignment rate
```
- This message can also be outputted by `samtools`. 

{: .note }
The subsequent process utilizes the resulting 'SAM' file.

# Citations
{: .fs-7 .fw-400 .lh-tight } 

<div style="border: 2px solid #b19cd9; border-radius: 15px; padding: 15px; margin: 20px; text-align: left; font-size: 1em; line-height: 1.5; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <span class="label label-purple" style="display: inline-block; margin-bottom: 10px; position: relative; left: -10px;">Bowtie2</span>
    <ol style="padding-left: 40px;">
        <li style="margin-bottom: 10px;">
            <span><b>Langmead, B.</b>, & Salzberg, S. L. (2012). Fast gapped-read alignment with Bowtie 2. <i>Nature methods</i>, 9(4), 357-359. <a href="https://doi.org/10.1038/nmeth.1923" target="_blank">DOI</a></span>
        </li>
        <li style="margin-bottom: 10px;">
            <span><b>Langmead, B.</b>, Wilks, C., Antonescu, V., & Charles, R. (2019). Scaling read aligners to hundreds of threads on general-purpose processors. <i>Bioinformatics</i>, 35(3), 421-432. <a href="https://doi.org/10.1093/bioinformatics/bty648" target="_blank">DOI</a></span>
        </li>
    </ol>
</div>