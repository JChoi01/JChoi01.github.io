---
layout: default
title: Efficient Analysis and Visualization with ngs.plot
parent: Data Analysis - ChIP-seq
nav_order: 2
---

© 2022 Janghyun Choi<br>
![Docer](https://img.shields.io/badge/Revised%20version-5%2E15%2E24-green?style=flat&logo=Markdown&colorA=black) [![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-green?labelColor=black)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

# Efficient Analysis and Visualization of ChIP-seq Data via Genomic Databases
{: .fs-8 .lh-tight }
The 'ngs.plot' tool is a specialized resource designed to enhance the visualization and analysis of next-generation sequencing (NGS) data. This tool is particularly adept at quickly accessing and integrating large genomic databases to plot dense NGS data against a backdrop of functional genomic elements. One of the primary advantages of 'ngs.plot' is its ability to manage and visualize complex datasets with ease and precision. Users can rapidly generate high-quality plots of genomic regions of interest, which is critical for interpreting interactions and expression levels in various genomic studies, such as ChIP-seq and RNA-seq analyses. This protocol was created based on <span style="color: #7253ec;"><b>ngs.plot version 2.61</b></span> running on a system equipped with an Intel 10th generation i9-10910 processor and 48GB of memory. The test environment includes <span style="color: #7253ec;"><b>Python version 3.8.5, Perl version 5.26.2, and R version 4.4.0 under macOS 12.4 environment.</b></span>
{: .fs-4 .fw-500 }

# Step-by-Step Installation
{: .fs-7 .fw-400 .lh-tight } 
![EnvTest](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white) [![gith](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/shenlab-sinai/ngsplot) ![version](https://img.shields.io/badge/release-2.61-blue?labelColor=black) ![Status](https://img.shields.io/badge/status-unstable-red?labelColor=black)

### 1. Download ngs.plot package from <a href="https://drive.google.com/folderview?id=0B1PVLadG_dCKN1liNFY0MVM1Ulk&usp=sharing" target="_blank">GDrive</a> (Official) to a desired folder and exract it as follow.
    
```bash
$ cd downloads
$ tar xvfz ngsplot-2.61.tar.gz
$ mv ngsplot-2.61 /Users/jchoi/ngsplot
```

### 2. Add ngsplot executables to your path under zshrc.

```bash
$ nano ~/.zshrc

# Add syntax as follows;
export PATH="/your/path/to/ngsplot/bin:$PATH"
export NGSPLOT="/your/path/to/ngsplot"

# For example
export PATH="/Users/Desktop/ChIP_seq/ngsplot/bin:$PATH"
export NGSPLOT="/Users/Desktop/ChIP_seq/ngsplot"
```

### 3. save and reload shell environment as follow.
```bash
$ source ~/.zshrc
```

### 4. Install ngs.plot dependent libraries in R.
```R
install.packages("doMC", dep=T)
install.packages("caTools", dep=T)
install.packages("utils", dep=T)
BiocManager::install("BSgenome")
BiocManager::install("Rsamtools")
BiocManager::install("ShortRead")
```

### 5. Prepare Genome Database.
- Download desired genome database from <a href="https://drive.google.com/drive/folders/0B1PVLadG_dCKNEsybkh5TE9XZ1E?resourcekey=0-ux6XMoJr0qaS6lemqPJBpQ" target="_blank">GDrive</a> (Official).
- Install this file as follows:

```bash
$ ngsplotdb.py list # check current list
ID       Assembly     Species      EnsVer   NPVer    InstalledFeatures
hg19	GRCh37	homo_sapiens	75.0	3.0	cgi,exon,genebody,tss,tes
IRGSP-1	IRGSP-1.0	oryza_sativa	21.0	3.0	exon,genebody,tss,tes

$ ngsplotdb.py install /Users/jchoi/Downloads/ngsplotdb_mm10_75_3.00.tar.gz # install databse

$ ngsplotdb.py list # check the installed database
ID       Assembly     Species      EnsVer   NPVer    InstalledFeatures
hg19	GRCh37	homo_sapiens	75.0	3.0	cgi,exon,genebody,tss,tes
IRGSP-1	IRGSP-1.0	oryza_sativa	21.0	3.0	exon,genebody,tss,tes
mm10	GRCm38	mus_musculus	75.0	3.0	cgi,exon,genebody,tss,tes
```

{: .note }
This tool may occasionally experience malfunctions. These are predominantly attributed to issues with Python syntax, and the author swiftly addresses and resolves these concerns by issuing updated source code. Should the tool cease to function abruptly, it is advisable to consult the creator's GitHub repository. [![gith](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/shenlab-sinai/ngsplot)

{% include code_input_box.html %}

# Running ngs.plot
{: .fs-7 .fw-400 .lh-tight } 
- Use the following command to visulize enriched peaks from ChIP-seq data with `ngs.plot`:

    ```bash
    $ ngs.plot.r -G <genome> -R <region> -C <IndexedInput.bam> -O <outputFolder> <OptionalParameters>
    ```

- In these commands,

    | Parameter | Description |
    |----|----|
    | `-G <Genome>` | Specifies the genome name. Use `ngsplotdb.py` list to show available genomes. See the Step-by-step Installation section.  |
    | `-R <region>` | Specifies genomic regions to plot. Possible values for region are `tss`, `tes`, `genebody`, `exon`, `cgi`, and `enhancer`.    |
    | `-C <IndexedInput.bam>` | Specifies the input file. This file reqires an **indexed** BAM file for single plot or a specific configuration file for multiplot (See the below).   |
    | `-O <outputFolder>` | Specifies the output file. Several files will be generated. |

- Prepare a configuration file and save as plaintext (`name.txt`) as follow:
    
    ```bash
    # If you want to specify the gene list as "genome", use "-1".
    # Use TAB to separate the three columns: coverage file<TAB>gene list<TAB>title
    # "title" will be shown in the figure's legend.
    hesc.H3k4me3.rmdup.sort.bam     high_expressed_genes.txt         "High"
    hesc.H3k4me3.rmdup.sort.bam     medium_expressed_genes.txt       "Med"
    hesc.H3k4me3.rmdup.sort.bam     low_expressed_genes.txt          "Low"
    ```

- Major Optional Parameters (`<OptionalParameter>`)

    | Parameter | Description |
    |----|----|
    | `-T <Title>` | Specifies image title (Default: NoName).  |
    | `-L <int>` | Specifies size in bps. By default, when `-R tss, tes, genebody`, `-L 2000`; when `-R exon, cgi`, `-L 500`.  |
    | `-P <int>` | Specifies `0` to use all CPUs that are detected on your machine.  |
    | `-FL <int>` | This parameter calculates physical instead of read coverage. This will produce figures that contain more accurate representation of ChIP enrichment. <br>**You should set this value equal to the average fragment length in your sequencing library** (Default: 150).  |
    | `-LEG <int>` | Control the display of legend: 1 (default) or 0 (No legend).  |
    | `-VLN <int>` | Control the display of vertical lines: 1 (default) or 0 (No line).  |

- For more detailed parameter options, see the <a href="https://github.com/shenlab-sinai/ngsplot/wiki/ProgramArguments101" target="_blank">ProgramArguments101</a>.

## <u>Example Code</u>
{: .fs-5 .fw-400 .lh-tight }
- Here is an example command to depict peaks distribution:

    ```bash
    # Single plot
    $ ngs.plot.R -G mm10 -R genebody -C /Users/jchoi/Desktop/R_FINAL.bam -O /Users/jchoi/Desktop/NFIB \
    -T NFIB -L 2000 -SE 0 -FL 100 -LEG 0 -VLN 0

    # Multiplot
    ## Configuration file, H3K4_K27.txt
    Final.sort.H2O2_H3K27me3.bam:Final.sort.Unt_IPT.bam	-1	"H3K27me3"
    Final.sort.H2O2_H3K4me3.bam:Final.sort.Unt_IPT.bam	-1	"H3K4me3"
    ## Command
    $ ngs.plot.r -G hg19 -R genebody -C H3K4_K27.txt -O /Users/jchoi/Desktop/Bivalency \
    -L 3000 -SE 0 -FL 100 -LEG 0 -VLN 0 -YAS -0.4,1.5 -SC -2,4
    ```

{% include code_input_box.html %}

## <u>Example Plot</u>
{: .fs-5 .fw-400 .lh-tight }
The graph created using the second (multiplot) of the example codes above, refined using Illustrator 2024.

<p align="center">
    <img src="https://raw.githubusercontent.com/seq-jchoi-bio/seq-portfolio/main/DataAnalysis_ChIPSeq/Images/ngsPlot.png" alt="ngsplot" style="width: 40vh; height: auto;">
</p>

# Citation
{: .fs-7 .fw-400 .lh-tight } 

<div style="border: 2px solid #b19cd9; border-radius: 15px; padding: 15px; margin: 20px; text-align: left; font-size: 1em; line-height: 1.5; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <span class="label label-purple" style="display: inline-block; margin-bottom: 10px; position: relative; left: -10px;">ngsplot</span>
    <ol style="padding-left: 40px;">
        <li style="margin-bottom: 10px;">
            <span><b>Shen, L.</b>, Shao, N., Liu, X., & Nestler, E. (2014). ngs. plot: Quick mining and visualization of next-generation sequencing data by integrating genomic databases. <i>BMC genomics</i>, 15, 1-14. <a href="https://doi.org/10.1186/1471-2164-15-284" target="_blank">DOI</a></span>
        </li>
    </ol>
</div>