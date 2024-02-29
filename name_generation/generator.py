# Dictionary representing the morse code chart
MORSE_CODE_DICT = { 
    'A':'.-', 'B':'-...',
    'C':'-.-.', 'D':'-..', 'E':'.',
    'F':'..-.', 'G':'--.', 'H':'....',
    'I':'..', 'J':'.---', 'K':'-.-',
    'L':'.-..', 'M':'--', 'N':'-.',
    'O':'---', 'P':'.--.', 'Q':'--.-',
    'R':'.-.', 'S':'...', 'T':'-',
    'U':'..-', 'V':'...-', 'W':'.--',
    'X':'-..-', 'Y':'-.--', 'Z':'--..',
    "'": '.----.'
}

# Point values from scrabble
SCRABBLE_VALUE_DICT = {
    "A": 1, "B": 3, "C": 3, "D": 2, "E": 1, "F": 4,
    "G": 2, "H": 4, "I": 1, "J": 8, "K": 5, "L": 1,
    "M": 3, "N": 1, "O": 1, "P": 3, "Q": 10, "R": 1,
    "S": 1, "T": 1, "U": 1, "V": 4, "W": 4, "X": 8,
    "Y": 4, "Z": 10, "'": 0
}

# SYNCS Multiplier
SYNCS_MULTIPLIER = {
    "S": 10, "Y": 10, "N": 10, "C": 10, "S": 10
}
                   
names = []
algo_order = []
min_distance = 10e9

def mystery_hash(name):
    hash = 0
    name = name.replace(' ', '')
    for char in name: 
        morse_equiv = MORSE_CODE_DICT[char.upper()]
        n_dots = morse_equiv.count('.')
        scrabble_val = SCRABBLE_VALUE_DICT[char.upper()]
        syncs_val = 0
        if char in SYNCS_MULTIPLIER.keys():
            syncs_val = 10
        hash += scrabble_val + syncs_val
    
    return hash

def extract_names(fname):
    with open(fname) as names_file:
        all_names = names_file.readlines()
        for curr_name in all_names:
            names.append(curr_name.strip())

def generate_tex(names):
    tex_string = "\\documentclass[handout, xcolor=svgnames]{beamer}" \
                 "\\usetheme{Montpellier}" \
                "\\usecolortheme{dolphin}" \
                "\\usepackage{pgfpages}" \
                "\\pgfpageslogicalpageoptions{1}{border code=\\pgfusepath{stroke}}" \
                "\\pgfpageslogicalpageoptions{2}{border code=\\pgfusepath{stroke}}" \
                "\\pgfpageslogicalpageoptions{3}{border code=\\pgfusepath{stroke}}" \
                "\\pgfpageslogicalpageoptions{4}{border code=\\pgfusepath{stroke}}" \
                "\\author{Dillon De Silva}" \
                "\\mode<handout> {" \
                "\\usepackage{pgfpages}" \
                "\\pgfpagesuselayout{6 on 1}[a4paper]" \
                "}" \
                "\\begin{document}"

    i = 0
    while i < len(names) - 6:
        for k in range(6):
            tex_string += "\\begin{frame}" \
            "\\begin{center}" \
            f"\\Huge {names[i + k]}  \\\\" \
            "\\end{center}" \
            "\\end{frame}"
            print(i + k + 1)

        for k in range(0, 6, 2):
            print(f"Mapping {i + k + 1} + {i + k + 2}")
            print(f"Mapping {i + k} + {i + k + 1}")
            tex_string += "\\begin{frame}" \
            "\\begin{center}" \
            f"\\Huge Hi {names[i + k + 1]},  \\\\" \
            f"Welcome to SYNCS Camp! Your target is \\color{{red}} {names[i + k + 2]}" \
            "\\end{center}" \
            "\\end{frame}" \
            "\\begin{frame}" \
            "\\begin{center}" \
            f"\\Huge Hi {names[i + k]},  \\\\" \
            f"Welcome to SYNCS Camp! Your target is \\color{{red}} {names[i + k + 1]}" \
            "\\end{center}" \
            "\\end{frame}"

        i += 6
    print(f"after first run, i is {i}")
    tex_string += "\\newpage"
    last_even_divider = i
    while i < len(names) - 1:
        tex_string += "\\begin{frame}" \
        "\\begin{center}" \
        f"\\Huge {names[i]}  \\\\" \
        "\\end{center}" \
        "\\end{frame}"  
        i += 1

    tex_string += "\\begin{frame}" \
    "\\begin{center}" \
    f"\\Huge {names[-1]}  \\\\" \
    "\\end{center}" \
    "\\end{frame}"

    tex_string += "\\newpage"
    i = last_even_divider

    while i < len(names) - 2:
        tex_string += "\\begin{frame}" \
            "\\begin{center}" \
            f"\\Huge Hi {names[i + 1]},  \\\\" \
            f"Welcome to SYNCS Camp! Your target is \\color{{red}} {names[i + 2]}" \
            "\\end{center}" \
            "\\end{frame}" \
            "\\begin{frame}" \
            "\\begin{center}" \
            f"\\Huge Hi {names[i]},  \\\\" \
            f"Welcome to SYNCS Camp! Your target is \\color{{red}} {names[i + 1]}" \
            "\\end{center}" \
            "\\end{frame}"

        i += 2

    tex_string += "\\begin{frame}" \
            "\\begin{center}" \
            f"\\Huge Hi {names[-1]},  \\\\" \
            f"Welcome to SYNCS Camp! Your target is \\color{{red}} {names[0]}" \
            "\\end{center}" \
            "\\end{frame}""\\begin{frame}" \
            "\\begin{center}" \
            f"\\Huge Hi {names[-2]},  \\\\" \
            f"Welcome to SYNCS Camp! Your target is \\color{{red}} {names[-1]}" \
            "\\end{center}" \
            "\\end{frame}"

    # tex_string += "\\newpage"
    # i = last_even_divider
    # while i < len(names) - 1:
    #     tex_string += "\\begin{frame}" \
    #     "\\begin{center}" \
    #     f"\\Huge {names[i]},  \\\\" \
    #     "\\end{center}" \
    #     "\\end{frame}"  
    #     i += 1
 

    # for k in range(5, -2, -1):
    #     print(len(names) - k - 1)
    #     tex_string += "\\begin{frame}" \
    #                 "\\begin{center}" \
    #                 f"\\Huge Hi {names[-2 - k - 1]},  \\\\" \
    #                 f"Welcome to SYNCS Camp! Your target is \\color\{{red}} {names[-2 - k]}" \
    #                 "\\end{center}" \
    #                 "\\end{frame}"

    # for k in range(5, -2, -1):
    #     tex_string += "\\begin{frame}" \
    #     "\\begin{center}" \
    #     f"\\Huge Hi {names[-2 - k - 1]},  \\\\" \
    #     "\\end{center}" \
    #     "\\end{frame}"
    # tex_string += "\\begin{frame}" \
    # "\\begin{center}" \
    # f"\\Huge {names[-1]},  \\\\" \
    # "\\end{center}" \
    # "\\end{frame}"

    tex_string += "\\end{document}"

    f = open("generated_nametags.tex", "w")
    f.write(tex_string)
    f.close()

extract_names('names.txt')
names_by_hashes = [[name, 0] for name in names]
for name_pair in names_by_hashes:
    print(name_pair)
    name_pair[1] = mystery_hash(name_pair[0])


algo_order = sorted(names_by_hashes, key=lambda x: x[1])
names = [i[0] for i in algo_order]
generate_tex(names)
print(algo_order)