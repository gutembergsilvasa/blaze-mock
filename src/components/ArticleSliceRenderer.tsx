import type { MediaItem, Slice, TableData } from "../utils/types";
import { RichText } from "./RichText";
import { Table } from "./Table";

type BlockKind = "texto" | "banner" | "tabela";

type ParsedBlock = {
  key: string;
  index: number;
  kind: BlockKind;
  value: unknown;
};

// Ordem fixa dentro de cada grupo: imagem (banner) → texto → tabela.
const KIND_ORDER: Record<BlockKind, number> = {
  banner: 0,
  texto: 1,
  tabela: 2,
};

const KEY_PATTERN = /^(\d+)-(texto|banner|tabela)$/;

/**
 * Parseia o `primary` de uma slice em blocos ordenados.
 * Chaves seguem o padrão `(index)-(texto|banner|tabela)`. Chaves fora do padrão
 * e itens ausentes (`value` nulo) são ignorados.
 */
function parsePrimary(primary: Record<string, unknown>): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];

  for (const [key, value] of Object.entries(primary)) {
    if (value == null) continue;
    const match = KEY_PATTERN.exec(key);
    if (!match) continue;
    blocks.push({
      key,
      index: Number(match[1]),
      kind: match[2] as BlockKind,
      value,
    });
  }

  return blocks.sort(
    (a, b) => a.index - b.index || KIND_ORDER[a.kind] - KIND_ORDER[b.kind],
  );
}

function BannerBlock({ banner }: { banner: MediaItem }) {
  if (!banner?.url) return null;
  const mobileUrl = banner.mobile?.url;

  return (
    <figure className="mx-auto max-w-2xl">
      <picture>
        {mobileUrl && <source media="(max-width: 768px)" srcSet={mobileUrl} />}
        <img
          src={banner.url}
          alt={banner.alt ?? ""}
          className="w-full overflow-hidden rounded-lg bg-blaze-surface-2"
        />
      </picture>
    </figure>
  );
}

function SliceBlock({ block }: { block: ParsedBlock }) {
  switch (block.kind) {
    case "texto":
      return (
        <div className="mx-auto max-w-2xl">
          <RichText content={block.value} />
        </div>
      );
    case "banner":
      return <BannerBlock banner={block.value as MediaItem} />;
    case "tabela":
      return (
        <div className="mx-auto max-w-2xl">
          <Table table={block.value as TableData} />
        </div>
      );
    default:
      return null;
  }
}

/**
 * Renderiza dinamicamente o conteúdo das slices do artigo.
 * Para cada slice, agrupa os itens de `primary` por índice e renderiza
 * na ordem texto → imagem → tabela, ignorando os que estiverem ausentes.
 */
export function ArticleSliceRenderer({ slices }: { slices: Slice[] }) {
  return (
    <div className="mt-8 space-y-8">
      {slices.map((slice) =>
        parsePrimary(slice.primary).map((block) => (
          <SliceBlock key={`${slice.id}-${block.key}`} block={block} />
        )),
      )}
    </div>
  );
}
