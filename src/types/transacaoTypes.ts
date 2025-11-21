import z from "zod";

export const bodyTransacao = z
  .object({
    valor: z.number().min(0, "O valor deve ser maior ou igual a 0"),
    dataHora: z
      .string()
      .trim() // remove espaços no início/fim
      .nonempty("A data/hora é obrigatória") // não permite ''
      // Validação do formato ISO 8601 com offset
      .regex(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?([+-]\d{2}:\d{2})$/,
        "Data/hora inválida. Use o formato ISO 8601 com offset, ex: 2020-08-07T12:34:56.789-03:00"
      )
      // Transformar em Date
      .transform((value) => new Date(value))
      // Validar se não é futura e se é uma data válida
      .refine((date) => !isNaN(date.getTime()), "Data/hora inválida")
      .refine(
        (date) => date.getTime() <= Date.now(),
        "A data/hora não pode ser no futuro"
      ),
  })
  .strict();
