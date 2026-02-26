from collections import Counter

# Dictionary for letter and numbers
CARDS_VALUE_DICT = {
    "A": 1, "B": 3, "C": 3, "D": 4, "E": 5, "F": 6,
    "G": 7, "H": 8, "I": 9, "J": 10, "K": 11, "L": 12,
    "M": 13, "N": 1, "O": 2, "P": 3, "Q": 4, "R": 5,
    "S": 6, "T": 7, "U": 8, "V": 9, "W": 10, "X": 11,
    "Y": 12, "Z": 13,
}

names = []

def mystery_hash(name):
    total = 0 
    name = name.replace(' ', '')

    for char in name:
        char = char.upper()
        if char not in CARDS_VALUE_DICT:
            continue

        total += CARDS_VALUE_DICT[char]
    
    return total


def poker_rank_value(char):
    rank = CARDS_VALUE_DICT[char.upper()]
    # Keep hash logic unchanged; only tie-break comparison treats Ace as high.
    return 14 if rank == 1 else rank


def hand_key(ranks):
    counts = Counter(ranks)
    count_values = sorted(counts.values(), reverse=True)

    if count_values[0] == 5:
        hand_class = 7  # five of a kind
    elif count_values[0] == 4:
        hand_class = 6  # four of a kind
    elif count_values == [3, 2]:
        hand_class = 5  # full house
    elif count_values[0] == 3:
        hand_class = 4  # three of a kind
    elif count_values == [2, 2, 1]:
        hand_class = 3  # two pair
    elif count_values[0] == 2:
        hand_class = 2  # one pair
    else:
        hand_class = 1  # high card

    grouped = sorted(((cnt, rank) for rank, cnt in counts.items()), reverse=True)
    kicker = tuple(rank for cnt, rank in grouped for _ in range(cnt))
    return hand_class, kicker


def hand_class_name(hand_class):
    return {
        7: "five_kind",
        6: "four_kind",
        5: "full_house",
        4: "three_kind",
        3: "two_pair",
        2: "one_pair",
        1: "high_card",
        0: "no_hand",
    }[hand_class]


def poker_groups(name):
    ranks = [poker_rank_value(char) for char in name if char.upper() in CARDS_VALUE_DICT]
    groups = []
    for i in range(0, len(ranks), 5):
        group = ranks[i:i + 5]
        if len(group) == 5:
            groups.append(group)
    return groups


def tiebreak_chain(name):
    groups = poker_groups(name)
    return tuple(sorted((hand_key(group) for group in groups), reverse=True))


def normalized_name(name):
    return "".join(char.upper() for char in name if char.upper() in CARDS_VALUE_DICT)


def best_poker_tiebreak(name):
    chain = tiebreak_chain(name)
    if not chain:
        return 0, ()
    return chain[0]

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
            # print(i + k + 1)

        for k in range(0, 6, 2):
            # print(f"Mapping {i + k + 1} + {i + k + 2}")
            # print(f"Mapping {i + k} + {i + k + 1}")
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
    # print(f"after first run, i is {i}")
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


algo_order = sorted(
    names_by_hash,
    key=lambda x: (
        x[1],                          # total score
        tiebreak_chain(x[0]),          # best group, then next best, etc.
        len(normalized_name(x[0])),    # longer name wins if chain fully tied
        x[0].upper(),                  # alphabetical descending (Z -> A)
    ),
    reverse=True,
)
names = [pair[0] for pair in algo_order]
generate_tex(names)

score_counts = Counter(score for _, score in names_by_hash)

for name, score in algo_order:
    if score_counts[score] > 1:
        groups = poker_groups(name)
        ranked = sorted(
            [(hand_key(group), group) for group in groups],
            key=lambda item: item[0],
            reverse=True,
        )
        chain_details = [
            f"{group}:{hand_class_name(key[0])},kicker={key[1]}"
            for key, group in ranked
        ]

        print(
            f"{name} | total={score} | tie_chain=[{' ; '.join(chain_details)}] | "
            f"length={len(normalized_name(name))}"
        )
    else:
        print(f"{name} | total={score}")
