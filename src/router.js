export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const route = this.routes[hash] || this.routes['/'];
    route();
  }
}