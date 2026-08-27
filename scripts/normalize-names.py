"""
Padroniza nomes do CSV:
- Primeira letra maiúscula, resto minúsculo em cada palavra
- Preposições (de, da, do, dos, das, e) sempre minúsculas
- Preserva emails inalterados
- Gera backup .bak antes de sobrescrever
"""
import csv
import shutil
from pathlib import Path

CSV_PATH = Path("referencia/contatos_limpos.csv")
BACKUP = CSV_PATH.with_suffix(".csv.bak")

PREPOSICOES = {"de", "da", "do", "dos", "das", "e", "di", "du"}


def normalizar_nome(nome: str) -> str:
    nome = (nome or "").strip()
    if not nome:
        return ""
    palavras = nome.split()
    resultado = []
    for i, p in enumerate(palavras):
        p_lower = p.lower()
        # Primeira palavra sempre capitalizada, mesmo se for preposição
        if i > 0 and p_lower in PREPOSICOES:
            resultado.append(p_lower)
        else:
            resultado.append(p_lower.capitalize())
    return " ".join(resultado)


def main():
    if not CSV_PATH.exists():
        print(f"[ERRO] {CSV_PATH} não encontrado")
        return

    # Backup
    shutil.copy2(CSV_PATH, BACKUP)
    print(f"[BACKUP] {BACKUP}")

    # Lê tudo
    with CSV_PATH.open("r", encoding="utf-8", newline="") as f:
        reader = csv.reader(f)
        rows = list(reader)

    if not rows:
        print("[ERRO] CSV vazio")
        return

    header = rows[0]
    data = rows[1:]

    alterados = 0
    for row in data:
        if len(row) < 2:
            continue
        original = row[1]
        novo = normalizar_nome(original)
        if novo != original:
            row[1] = novo
            alterados += 1

    # Escreve de volta com BOM (utf-8-sig) para compatibilidade com Excel/Resend
    with CSV_PATH.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(data)

    print(f"[OK] Total: {len(data)} · Alterados: {alterados}")
    print(f"[EXEMPLOS]")
    for row in data[:10]:
        if len(row) >= 2 and row[1]:
            print(f"  {row[0][:30]:30s} → {row[1]}")


if __name__ == "__main__":
    main()
