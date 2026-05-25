import { Button } from '../components/ui/Button'
import { Seo } from '../components/Seo'
import { useHome } from '../hooks/useHome'

function Home() {
  const { data, seo } = useHome()

  const hero = data?.hero
  const heroTitle = hero?.title ?? 'Bem-vindo à Blaze!'
  const heroSubtitle =
    hero?.subtitle ?? 'Cadastre-se e desbloqueie sua experiência exclusiva'
  const heroCta = hero?.cta ?? { label: 'Cadastre-se', href: '#cadastre-se' }

  return (
    <>
      <Seo
        seo={seo}
        fallbackTitle="Blaze - Cassino e Apostas Esportivas"
        fallbackDescription="Cadastre-se e desbloqueie sua experiência exclusiva"
      />

      {/* Hero banner */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden rounded-xl bg-blaze-surface px-10 py-12 bg-[url(../public/banner_inicial_bg.png)]"
      >
        <img
          src="/banner_inicial.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full object-cover object-right md:block"
        />

        <div className="relative z-10 max-w-xl">
          <h1
            id="hero-title"
            className="text-4xl font-bold tracking-tight text-white"
          >
            {heroTitle}
          </h1>
          <p className="mt-4 text-base text-white/80">{heroSubtitle}</p>

          <Button href={heroCta.href} size="lg" className="mt-8">
            {heroCta.label}
          </Button>
        </div>

        <ol
          aria-label="Passos para começar"
          className="relative z-10 mt-12 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm text-blaze-muted"
        >
          <li className="flex items-center gap-2">
            <img
              src="/svg-icon-1.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-6"
            />
            <span>Cadastre-se</span>
          </li>
          <li aria-hidden="true" className="px-1 text-blaze-muted/60">
            ›
          </li>
          <li className="flex items-center gap-2">
            <img
              src="/svg-icon-2.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-6"
            />
            <span>Deposite</span>
          </li>
          <li aria-hidden="true" className="px-1 text-blaze-muted/60">
            ›
          </li>
          <li className="flex items-center gap-2">
            <img
              src="/svg-icon-3.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-6"
            />
            <span>Jogue</span>
          </li>
          <li aria-hidden="true" className="px-1 text-blaze-muted/60">
            ›
          </li>
          <li className="flex items-center gap-2">
            <img
              src="/svg-icon-4.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-6"
            />
            <span>Desbloqueie sua Recompensa</span>
          </li>
        </ol>
      </section>

      {/* Categorias */}
      <section aria-label="Categorias" className="grid gap-6 md:grid-cols-2">
        <article
          id="cassino"
          className="relative overflow-hidden rounded-xl bg-blaze-surface p-8"
        >
          <img
            src="/slot_sub_hero.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden h-full object-cover object-right md:block"
          />
          <div className="relative z-10 max-w-xs">
            <h2 className="text-2xl font-bold text-white">Cassino</h2>
            <p className="mt-3 text-sm text-white/80">
              Aproveite nossa seleção exclusiva de slots, dealers ao vivo e
              jogos originais.
            </p>
            <Button href="#ir-cassino" size="md" className="mt-8">
              Ir ao Cassino
            </Button>
          </div>
        </article>

        <article
          id="esportes"
          className="relative overflow-hidden rounded-xl bg-blaze-surface p-8"
        >
          <img
            src="/sport_sub_hero.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden h-full object-cover object-right md:block"
          />
          <div className="relative z-10 max-w-xs">
            <h2 className="text-2xl font-bold text-white">Esportes</h2>
            <p className="mt-3 text-sm text-white/80">
              Nossas apostas esportivas intuitivas são feitas para jogadores
              novos e experientes.
            </p>
            <Button href="#ir-esportes" size="md" className="mt-8">
              Ir para Esportes
            </Button>
          </div>
        </article>
      </section>

      {/* Pagamento */}
      <section
        aria-labelledby="pagamento-title"
        className="px-6 py-10 text-center"
      >
        <h2
          id="pagamento-title"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
        >
          Método de Pagamento Preferido
        </h2>

        <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <img
            src="/pix_image_link.svg"
            alt="Pix - powered by Banco Central"
            className="h-12 w-auto"
          />

          <span
            aria-hidden="true"
            className="hidden h-12 w-px bg-blaze-border sm:block"
          />

          <Button href="#deposito" size="md">
            Faça o Depósito
          </Button>
        </div>
      </section>

      {/* Patrocínios */}
      <section aria-label="Patrocínios" className="grid gap-6 md:grid-cols-2">
        <article className="relative overflow-hidden rounded-xl bg-blaze-surface p-6">
          <img
            src="/hero_1.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute right-4 top-4 z-10 rounded-md bg-blaze-surface-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Patrocínio
          </span>
          <div className="relative z-10 mt-32 max-w-xs">
            <h3 className="text-xl font-bold text-white">AS Monaco</h3>
            <p className="mt-1 text-sm text-blaze-muted">Patrocinador Máster</p>
            <Button
              to="/article/as-monaco"
              variant="outline"
              size="xs"
              className="mt-5"
            >
              Veja Mais
            </Button>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-xl bg-blaze-surface p-6">
          <img
            src="/hero_2.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden h-full object-cover object-right md:block"
          />
          <span className="absolute right-4 top-4 z-10 rounded-md bg-blaze-surface-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Patrocínio
          </span>
          <div className="relative z-10 max-w-xs">
            <h3 className="text-xl font-bold text-white">
              Parceiro Oficial da Virginia
            </h3>
            <p className="mt-3 text-sm text-white/80">
              Junte-se a ela na maior plataforma de jogos da América Latina e
              aproveite recompensas exclusivas. Não perca!
            </p>
            <Button
              to="/article/virginia"
              variant="outline"
              size="xs"
              className="mt-5"
            >
              Veja Mais
            </Button>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-xl bg-blaze-surface p-6">
          <img
            src="/hero_3.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute right-4 top-4 z-10 rounded-md bg-blaze-surface-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Patrocínio
          </span>
          <div className="relative z-10 mt-32 max-w-xs">
            <h3 className="text-xl font-bold text-white">
              Parceiro Oficial do Neymar Jr.
            </h3>
            <Button
              to="/article/neymar"
              variant="outline"
              size="xs"
              className="mt-5"
            >
              Veja Mais
            </Button>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-xl bg-blaze-surface p-6">
          <img
            src="/hero_4.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute right-4 top-4 z-10 rounded-md bg-blaze-surface-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Patrocínio
          </span>
          <div className="relative z-10 mt-32 max-w-xs">
            <h3 className="text-xl font-bold text-white">Atlético Goianiense</h3>
            <p className="mt-1 text-sm text-blaze-muted">Patrocinador Máster</p>
            <Button
              to="/article/atletico"
              variant="outline"
              size="xs"
              className="mt-5"
            >
              Veja Mais
            </Button>
          </div>
        </article>
      </section>
    </>
  )
}

export default Home
