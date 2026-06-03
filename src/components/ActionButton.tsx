import type { CtaSlicePrimary, Slice } from "../utils/types";

type Props = {
  /** Primeiro item do array de `slices` retornado pela API de delivery. */
  slice?: Slice;
  className?: string;
};

/**
 * Renderiza um botão de call-to-action a partir de uma slice do tipo "cta".
 * Retorna `null` caso a slice não exista, não seja do tipo "cta" ou esteja
 * sem link/texto.
 */
export function ActionButton({ slice, className }: Props) {
  if (!slice || slice.slice_type !== "cta") return null;

  const primary = slice.primary as Partial<CtaSlicePrimary>;
  const href = primary["link-cta"];
  const color = primary["cor-cta"];
  const label = primary["texto-cta"]?.text;

  if (!href || !label) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={color ? { backgroundColor: color } : undefined}
      className={
        className ??
        "inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
      }
    >
      {label}
    </a>
  );
}
