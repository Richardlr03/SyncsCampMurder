from collections import Counter

# Dictionary for letter and numbers
CARDS_VALUE_DICT = {
    "A": 1, "B": 3, "C": 3, "D": 4, "E": 5, "F": 6,
    "G": 7, "H": 8, "I": 9, "J": 10, "K": 11, "L": 12,
    "M": 13, "N": 1, "O": 2, "P": 3, "Q": 4, "R": 5,
    "S": 6, "T": 7, "U": 8, "V": 9, "W": 10, "X": 11,
    "Y": 12, "Z": 13,
}

SUIT_MULTIPLIER = {
    "A": 1, "B": 1, "C": 1, "D": 1, "E": 1, "F": 1,
    "G": 0, "H": 0, "I": 0, "J": 0, "K": 0, "L": 0,
    "M": 2, "N": 2, "O": 2, "P": 2, "Q": 2, "R": 2,
    "S": -1, "T": -1, "U": -1, "V": -1, "W": -1, "X": -1,
}

JOKERS = {"Y", "Z"}
JOKER_VALUE = 7

names = []

def mystery_hash(name):
    total = 0 
    name = name.replace(' ', '')

    for char in name:
        char = char.upper()
        if char not in CARDS_VALUE_DICT:
            continue

        card_num = CARDS_VALUE_DICT[char]

        if char in JOKERS:
            total += card_num + JOKER_VALUE
        else:
            suit_modifier = SUIT_MULTIPLIER[char]
            total += card_num + suit_modifier
    
    return total

# def poker_score(hands):
#     name = name.replace(' ', '').upper()
#     counts = Counter(name)
#     freq = sorted(counts.values(), reverse=True)

#     if freq[0] == 4

def extract_names(fname):
    with open(fname) as names_file:
        for line in names_file:
            names.append(line.strip())


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
            "\\end{frame}" \
            "\\begin{frame}" \
            "\\begin{center}" \
            f"\\Huge Hi {names[-2]},  \\\\" \
            f"Welcome to SYNCS Camp! Your target is \\color{{red}} {names[-1]}" \
            "\\end{center}" \
            "\\end{frame}"

    tex_string += "\\end{document}"

    f = open("generated_nametags.tex", "w")
    f.write(tex_string)
    f.close()

extract_names("names.txt")

names_by_hash = []

for name in names:
    score = mystery_hash(name)
    names_by_hash.append([name, score])


algo_order = sorted(names_by_hash, key=lambda x: x[1], reverse=True)
names = [pair[0] for pair in algo_order]
generate_tex(names)
print(algo_order)