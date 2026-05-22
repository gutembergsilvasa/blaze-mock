import { Link, Outlet } from "react-router-dom";
import { Button } from "./components/ui/Button";

function App() {
  return (
    <div className="min-h-screen bg-blaze-bg text-white">
      {/* Top navigation */}
      <header className="border-b border-blaze-border/60">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <button
              type="button"
              aria-label="Abrir menu"
              className="grid h-9 w-9 place-items-center rounded text-lg text-white/90 hover:bg-blaze-surface-2 hover:text-white"
            >
              <i className="fa-solid fa-bars" aria-hidden="true" />
            </button>
            <Link
              to="/"
              aria-label="Blaze - página inicial"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white"
            >
              <img src="/logo.svg" alt="" aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Principal" className="flex-1">
            <ul className="flex items-center justify-end gap-8 text-sm font-medium tracking-wide text-white/90">
              <li>
                <a
                  href="#cassino"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <i
                    className="fa-solid fa-clone text-base"
                    aria-hidden="true"
                  />
                  CASSINO
                </a>
              </li>
              <li>
                <a
                  href="#esportes"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <i
                    className="fa-solid fa-futbol text-base"
                    aria-hidden="true"
                  />
                  ESPORTES
                </a>
              </li>
              <li>
                <a
                  href="#pesquisa"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <i
                    className="fa-solid fa-magnifying-glass text-base"
                    aria-hidden="true"
                  />
                  PESQUISA
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <i
                    className="fa-solid fa-newspaper text-base"
                    aria-hidden="true"
                  />
                  BLOG
                </Link>
              </li>
            </ul>
          </nav>

          <div className="ml-8 flex items-center gap-4">
            <a
              href="#entrar"
              className="text-sm font-medium text-white/90 hover:text-white"
            >
              Entrar
            </a>
            <Button href="#cadastre-se" size="sm">
              Cadastre-se
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          aria-label="Categorias de jogos"
          className="hidden w-64 shrink-0 border-r border-blaze-border/60 lg:block"
        >
          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 hover:text-white">
              <span>Originais da Blaze</span>
              <i
                className="fa-solid fa-chevron-up text-[10px] transition-transform group-open:rotate-0 group-[:not([open])]:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <ul className="flex flex-col py-2 text-sm text-white/85">
              <li>
                <a
                  href="#jogado-recentemente"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-clock-rotate-left w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Jogado Recentemente</span>
                </a>
              </li>
              <li>
                <a
                  href="#crash"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-gas-pump w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Crash</span>
                </a>
              </li>
              <li>
                <a
                  href="#double"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-chart-column w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Double</span>
                </a>
              </li>
              <li>
                <a
                  href="#mines"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-bomb w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Mines</span>
                </a>
              </li>
              <li>
                <a
                  href="#fruit-slice"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-lemon w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Fruit Slice</span>
                </a>
              </li>
              <li>
                <a
                  href="#crash-neymar-jr"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-5 w-5 place-items-center rounded bg-blaze-surface-2 text-[8px] font-bold"
                  >
                    NJR
                  </span>
                  <span>Crash Neymar Jr</span>
                </a>
              </li>
              <li>
                <a
                  href="#fortune-double"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-circle-question w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Fortune Double</span>
                </a>
              </li>
              <li>
                <a
                  href="#crash-ii"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-rocket w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Crash II</span>
                </a>
              </li>
              <li>
                <a
                  href="#dice"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-dice w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Dice</span>
                </a>
              </li>
              <li>
                <a
                  href="#limbo"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-mountain w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Limbo</span>
                </a>
              </li>
              <li>
                <a
                  href="#tower"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-building w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Tower</span>
                </a>
              </li>
              <li>
                <a
                  href="#slide"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-sliders w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Slide</span>
                </a>
              </li>
              <li>
                <a
                  href="#plinko"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-bullseye w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Plinko</span>
                </a>
              </li>
              <li>
                <a
                  href="#coin-flip"
                  className="flex items-center gap-4 px-5 py-2.5 hover:bg-blaze-surface hover:text-white"
                >
                  <i
                    className="fa-solid fa-coins w-5 text-center text-blaze-muted"
                    aria-hidden="true"
                  />
                  <span>Coin Flip</span>
                </a>
              </li>
            </ul>
          </details>
        </aside>

        <main className="min-w-0 flex-1 space-y-6 px-6 py-6 mx-[5%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
