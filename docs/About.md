---
layout: default
title: About
nav_order: 2
---

# About
{: .fs-9 }

Sequencing Techniques Portfolio
{: .fs-6 .fw-300 }

---

This portfolio showcases a variety of approaches to sequencing technology, focusing on the data processing and analysis of different samples. The purpose of this repository is not to present a single tool, but to display the range of techniques and coding strategies I have employed in my research. Each directory or section of this repository corresponds to different sequencing projects, including but not limited to RNA-seq and ChIP-seq analyses. These projects demonstrate how I handle diverse data sets and apply unique analysis methodologies. This portfolio is broadly organized into two main categories: **Data Processing**  and **Data Analysis (RNA/ChIP-seq)**.

---

## Table of Contents

<details markdown="block">
<summary style="padding-left: 20px;"> <b style="font-size: 18px;">Data Processing</b> </summary>
<ul style="padding-left: 60px;">
    <li><a href="{% link docs/DataProcess/FastQC_manual.md %}">Basal QC with FastQC</a></li>
    <li><a href="{% link docs/DataProcess/Trimmmomatic_manual.md %}">Trimmed reads with Trimmomatic</a></li>
    <li><a href="{% link docs/DataProcess/HISAT2_MAUNAL.md %}">Mapping reads with HISAT2 for RNA-seq</a></li>
    <li><a href="{% link docs/DataProcess/Bowtie2_MANUAL.md %}">Mapping reads with Bowtie2 for ChIP-seq</a></li>
    <li><a href="{% link docs/DataProcess/SAMtools_MANUAL.md %}">File Conversion and Management with SAMtools</a></li>
    <li><a href="{% link docs/DataProcess/htseqCount_MANUAL.md %}">Feature counts with htseqCount</a></li>
    <li><a href="{% link docs/DataProcess/Genozip_MANUAL.md %}">File storage with Genozip</a></li>
    <li><a href="{% link docs/DataProcess/Tr.md %}">Basal setting and troubleshooting</a></li>
</ul>
</details>

<details markdown="block">
<summary style="padding-left: 20px;"> <b style="font-size: 18px;">Data Analysis - RNA-seq</b> </summary>
<ul style="padding-left: 60px;">
    <li><a href="{% link docs/RNASeq/DEG_edgeR_MANUAL.md %}">Normalization and DEG analysis with edgeR</a></li>
    <li><a href="{% link docs/RNASeq/DEG_CorPlot_MANUAL.md %}">DEG: Correlation plot</a></li>
    <li><a href="{% link docs/RNASeq/DEG_plotting_MANUAL.md %}">DEG: Visualization</a></li>
    <li><a href="{% link docs/RNASeq/GO_KEGG_MANUAL.md %}">DEG: Gene ontology and KEGG pathway analysis</a></li>
    <li><a href="{% link docs/RNASeq/HEATMAP_MANUAL.md %}">DEG: Heatmap</a></li>
</ul>
</details>

<details markdown="block">
<summary style="padding-left: 20px;"> <b style="font-size: 18px;">Data Analysis - ChIP-seq</b> </summary>
<ul style="padding-left: 60px;">
    <li><a href="{% link docs/ChIPSeq/deepTools_MANUAL.md %}">Exploring Sequencing Data with deepTools</a></li>
    <li><a href="{% link docs/ChIPSeq/ngsplot_MANUAL.md %}">Efficient Analysis and Visualization of ChIP-seq Data with ngs.plot</a></li>
    <li><a href="{% link docs/ChIPSeq/MACS_MANUAL.md %}">Peak detection: MACS3</a></li>
    <li><a href="{% link docs/ChIPSeq/SICER2_MANUAL.md %}">Peak detection: SICER2</a></li>
    <li><a href="{% link docs/ChIPSeq/PeakAnnotation_MANUAL.md %}">Peak Annotation with ChIPseeker</a></li>
    <li><a href="{% link docs/ChIPSeq/MotifAnalysis_MANUAL.md %}">Motif analysis with HOMER and MEME</a></li>
</ul>
</details>

<details markdown="block">
<summary style="padding-left: 20px;">
    <b style="font-size: 18px;">Data Science - Animal Locomotion Analysis</b>
    <span class="label label-purple">WIP</span>
</summary>
<ul style="padding-left: 60px;">
    <li>Tracking Animal Movement with R</li>
    <li>Converting Tracking Data to Coordinates and Calculating Physical Properties Using Python</li>
    <li>Plotting the Results with R</li>
</ul>
</details>

---

## Featured Projects

### **Project 1**: Identification of Gene Expression and Chromatin Dynamics Changes During Oxidative Stress
{: .fs-5 .fw-300 .text-purple-000 .lh-default }
- **Description**: In this project, we explored the effects of hydrogen peroxide-induced oxidative stress in a normal human keratinocyte cell line and three knockdown cell lines. We identified crucial changes in gene expression and chromatin dynamics of H3K4/H3K27me3, shedding light on the cellular mechanisms that activate NRF2-defense programs under oxidative stress.
- **Techniques Used**: RNA-seq and ChIP-seq
- **Key Finding**: **Choi J** & Lee H. *Free Radic. Biol. Med.* 217 (2024): 48-59. [Pubmed](https://pubmed.ncbi.nlm.nih.gov/38527695/)
- **Dataset**: Access the detailed datasets from GEO SuperSeries [GSE250128](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE250128), including SubSeries GSE250126 and GSE250127.

### **Project 2**: Establishing the Chromatin Landscape Regulating Stemness in Mesenchymal Stem Cells
{: .fs-5 .fw-300 .text-purple-000 .lh-default }
- **Description**: We examined gene expression and chromatin alterations in normal and knockdown mesenchymal stem cell (MSC) lines exposed to differentiation stimuli. Our advanced bioinformatics analysis showed the critical roles of lineage-specific transcription factors and histone-modifying enzymes in maintaining MSC stemness and identity.
- **Techniques Used**: RNA-seq and ChIP-seq
- **Key Findings**:  **Choi J** & Lee H. *J. Biol. Chem.* 299.10 (2023). [Pubmed](https://pubmed.ncbi.nlm.nih.gov/37633334/), **Choi J** & Lee H. *Sci. Rep.* 10.1 (2020): 3050. [Pubmed](https://pubmed.ncbi.nlm.nih.gov/32080306/)
- **Datasets**: Further explore our findings with GEO SuperSeries [GSE227538](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE227538) and [GSE131369](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE131369).

### **Project 3**: Comparative Transcriptome Analysis in Young vs. Middle-Aged Zebrafish Brains
{: .fs-5 .fw-300 .text-purple-000 .lh-default }
- **Description**: We compared whole brain transcriptomes from 3-month-old and 12-month-old zebrafish to identify significant gene expression changes related to aging.
- **Techniques Used**: RNA-seq
- **Status**: The research findings are currently being prepared for submission. Upon acceptance of the paper, the dataset will be released to the public.

### **Project 4**: Robust Link Between Gene Expression and Histone Dynamics During Short-Day Treatment in Plants
{: .fs-5 .fw-300 .text-purple-000 .lh-default }
- **Description**: We studied gene expression and histone acetylation in normal and knockout plants under short-day (SD) treatment to reveal the epigenetic mechanisms that trigger flowering.
- **Techniques Used**: RNA-seq and ChIP-seq
- **Status**: The research findings are currently being prepared for submission. Upon acceptance of the paper, the dataset will be released to the public.

## Implications of This Portfolio

This portfolio not only showcases a range of sophisticated sequencing techniques but also serves as a testament to my commitment to rigorous data analysis and innovative problem-solving in the field of genomics. The methodologies and strategies demonstrated here reflect my ability to adapt and optimize processes to meet the challenges presented by diverse datasets.

**For newcomers to sequencing,** this portfolio will act as a valuable learning resource. It offers practical examples and workflows that clarify RNA-seq and ChIP-seq analysis complexities. Sharing these insights allows me to support the broader community and help others master the latest sequencing technologies.

**Furthermore,** my work highlights the importance of transparency and reproducibility in scientific research. Each project within this repository is documented in a way that not only facilitates understanding but also enables others to replicate the results, fostering a culture of open science.

**In conclusion,** through this portfolio, I aim to demonstrate not just the technical skills necessary for high-quality genomic analysis but also my enthusiasm for advancing the field and educating others. I believe that the tools and techniques provided here will be invaluable for anyone looking to deepen their understanding of sequencing and its applications in modern biology.

## About This portfolio

- **Content License** <br>
[![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-green?labelColor=black)](http://creativecommons.org/licenses/by-nc-sa/4.0/) [![gith](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/seq-jchoi-bio/seq-portfolio)<br>
Copyright &copy; 2020-{{ "now" | date: "%Y" }} Janghyun Choi, Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
- **Design License** <br>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?labelColor=black)](https://github.com/just-the-docs/just-the-docs/tree/main/LICENSE.txt) [![gith](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/just-the-docs/just-the-docs)<br>
Copyright &copy; 2017-{{ "now" | date: "%Y" }} Patrick Marsceill, Distributed under an [MIT license](https://opensource.org/licenses/MIT). 