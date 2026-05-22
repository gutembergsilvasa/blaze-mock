import { useParams } from "react-router-dom";
import { EditorContent, useEditor, type Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useArticle } from "../hooks/useArticle";

function RenderTiptapContent({ content }: { content: Content }) {
  const editor = useEditor({
    editable: false,
    content,
    extensions: [StarterKit, Link],
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none text-sm leading-relaxed text-blaze-muted",
      },
    },
  });

  return <EditorContent editor={editor} />;
}

const fallback = {
  title:
    "Final da Liga Europa 2025/26: Veja que é o Favorito entre Freiburg e Aston Villa e Onde Assistir!",
  date: "2026-05-20",
  shareUrls: {
    twitter: "#share-twitter",
    facebook: "#share-facebook",
  },
};

function Article() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useArticle(slug);

  const title = data?.article_title.text ?? fallback.title;
  const date = data?.article_date ?? fallback.date;
  const banner = data?.article_banner;
  const shareUrls = fallback.shareUrls;
  const content = data?.article_main_content;

  console.log({ content, data });

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        <time
          dateTime={date}
          className="mt-6 inline-block text-xs font-bold uppercase tracking-wider text-blaze-red"
        >
          {date}
        </time>

        <div
          aria-label="Compartilhar"
          className="mt-4 flex items-center justify-center gap-3"
        >
          {shareUrls?.twitter && (
            <a
              href={shareUrls.twitter}
              aria-label="Compartilhar no Twitter"
              className="grid h-8 w-8 place-items-center rounded-full border border-blaze-border text-xs text-white/80 hover:bg-white/5 hover:text-white"
            >
              <i className="fa-brands fa-twitter" aria-hidden="true" />
            </a>
          )}
          {shareUrls?.facebook && (
            <a
              href={shareUrls.facebook}
              aria-label="Compartilhar no Facebook"
              className="grid h-8 w-8 place-items-center rounded-full border border-blaze-border text-xs text-white/80 hover:bg-white/5 hover:text-white"
            >
              <i className="fa-brands fa-facebook-f" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      <figure className="mt-8">
        <img
          src={banner}
          aria-hidden="true"
          className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-blaze-surface-2"
        />
      </figure>

      {content ? (
        <div className="mx-auto mt-8 max-w-2xl">
          <RenderTiptapContent content={content as Content} />
        </div>
      ) : null}

      {/* <div className="mx-auto mt-8 max-w-2xl space-y-4 text-justify text-sm leading-relaxed text-blaze-muted">
        <p>
          O Freiburg, da Alemanha, e o Aston Villa, da Inglaterra, jogam a
          grande decisão da Liga Europa 2025/26. Com a promessa de um grande
          espetáculo do futebol, a partida da final oferece também momentos de
          diversão para os fãs do esporte mais popular do mundo com as{" "}
          <a
            href="#apostas"
            className="font-semibold text-blaze-red underline-offset-2 hover:underline"
          >
            apostas esportivas
          </a>
          .
        </p>

        <p>
          A final está marcada para às 16h (horário de Brasília) desta
          quarta-feira (19), no Beşiktaş Stadium, em Istambul. Antes que a bola
          role e um novo campeão europeu seja sagrado, confira os detalhes do
          jogo, onde assistir e como apostar neste guia mais que especial da
          Blaze!
        </p>

        <h2 className="pt-4 text-lg font-bold text-white">
          Freiburg x Aston Villa
        </h2>

        <p>
          Dois times para lá de centenários decidem a final da Liga Europa
          2025/26, o Freiburg e o Aston Villa. E, cada um tem um passado
          diferente, com buscas por celebrações inéditas e o retorno a glórias
          do passado.
        </p>

        <p>
          O Aston Villa tem, em seu hall, três troféus de competições
          continentais da Europa. O clube ganhou a Liga Dos Campeões em 1981/82
          e a Supercopa daquela temporada. Depois, em 2001, ficou com o título
          da antiga Copa Intertoto. Já o Freiburg busca seu primeiro título
          europeu, antes mesmo de ter um troféu da primeira divisão do
          Bundesliga.
        </p>

        <p>
          Nesta temporada continental, durante a fase de liga, o Aston Villa
          ficou em 2º lugar, enquanto o Freiburg ficou em 7º, levando ambos
          direto às oitavas de final. No mata-mata, os ingleses eliminaram o
          francês Lille, depois passaram pelo italiano Bologna e, na semifinal,
          num duelo da Inglaterra, passaram pelo Nottingham Forest, virando o
          agregado no jogo de volta.
        </p>

        <p>
          O Freiburg, por sua vez, começou a caminhada diante do Genk, da
          Bélgica, com uma virada logo nas oitavas. Em seguida, venceu o
          espanhol Celta de Vigo duas vezes, terminando com outra virada, nas
          semis, agora diante do Braga, de Portugal.
        </p>
      </div> */}
    </article>
  );
}

export default Article;
