import z from "zod";

export const bodyTransacao = z.object({
    valor: z.number().min(1),
    dataHora: z.string()
});
