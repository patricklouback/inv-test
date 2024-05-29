export function normalizeString(str: string): string {
    return str
      .normalize("NFD") // Normaliza a string para decompor os caracteres acentuados em formas não acentuadas
      .replace(/[\u0300-\u036f]/g, "") // Remove os caracteres acentuados
      .toLowerCase() // Converte a string para minúsculas
      .replace(/[^a-zA-Z0-9]+/g, "-") // Substitui espaços e caracteres especiais por hífens
      .replace(/^-+|-+$/g, ""); // Remove hífens extras do início e do final da string
  }
  