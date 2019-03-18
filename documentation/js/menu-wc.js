'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7e41f1e8f16de4f53cfdff844218e4d7"' : 'data-target="#xs-components-links-module-AppModule-7e41f1e8f16de4f53cfdff844218e4d7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7e41f1e8f16de4f53cfdff844218e4d7"' :
                                            'id="xs-components-links-module-AppModule-7e41f1e8f16de4f53cfdff844218e4d7"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7e41f1e8f16de4f53cfdff844218e4d7"' : 'data-target="#xs-injectables-links-module-AppModule-7e41f1e8f16de4f53cfdff844218e4d7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7e41f1e8f16de4f53cfdff844218e4d7"' :
                                        'id="xs-injectables-links-module-AppModule-7e41f1e8f16de4f53cfdff844218e4d7"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CarteleraService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CarteleraService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStorageService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStorageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToasterService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ToasterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CarteleraModule.html" data-type="entity-link">CarteleraModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CarteleraModule-6b303962e597ee8f3d88f5916dd128cd"' : 'data-target="#xs-components-links-module-CarteleraModule-6b303962e597ee8f3d88f5916dd128cd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CarteleraModule-6b303962e597ee8f3d88f5916dd128cd"' :
                                            'id="xs-components-links-module-CarteleraModule-6b303962e597ee8f3d88f5916dd128cd"' }>
                                            <li class="link">
                                                <a href="components/AdministrarPermisosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministrarPermisosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarteleraComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CarteleraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreatePostComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreatePostComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeletePostComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeletePostComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPostComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditPostComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-6d40a74be7793a3084a49389a0f7198d"' : 'data-target="#xs-components-links-module-HomeModule-6d40a74be7793a3084a49389a0f7198d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-6d40a74be7793a3084a49389a0f7198d"' :
                                            'id="xs-components-links-module-HomeModule-6d40a74be7793a3084a49389a0f7198d"' }>
                                            <li class="link">
                                                <a href="components/CreateCarteleraComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateCarteleraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteCarteleraComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteCarteleraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCarteleraComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditCarteleraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerSeguidoresComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VerSeguidoresComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotificacionesModule.html" data-type="entity-link">NotificacionesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotificacionesModule-d07fd8a353547994e3671187e3b58bf5"' : 'data-target="#xs-components-links-module-NotificacionesModule-d07fd8a353547994e3671187e3b58bf5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificacionesModule-d07fd8a353547994e3671187e3b58bf5"' :
                                            'id="xs-components-links-module-NotificacionesModule-d07fd8a353547994e3671187e3b58bf5"' }>
                                            <li class="link">
                                                <a href="components/NotificacionesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificacionesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link">PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PostModule-e71ec8162edbbea843e699dcee14c3ec"' : 'data-target="#xs-components-links-module-PostModule-e71ec8162edbbea843e699dcee14c3ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PostModule-e71ec8162edbbea843e699dcee14c3ec"' :
                                            'id="xs-components-links-module-PostModule-e71ec8162edbbea843e699dcee14c3ec"' }>
                                            <li class="link">
                                                <a href="components/DeleteComentarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteComentarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PostComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuarioModule.html" data-type="entity-link">UsuarioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsuarioModule-fd3a1e30d09d5dbe614601348a6012e0"' : 'data-target="#xs-components-links-module-UsuarioModule-fd3a1e30d09d5dbe614601348a6012e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsuarioModule-fd3a1e30d09d5dbe614601348a6012e0"' :
                                            'id="xs-components-links-module-UsuarioModule-fd3a1e30d09d5dbe614601348a6012e0"' }>
                                            <li class="link">
                                                <a href="components/CartelerasCreadasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CartelerasCreadasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartelerasSeguidasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CartelerasSeguidasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PerfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostsCreadosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PostsCreadosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarteleraService.html" data-type="entity-link">CarteleraService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToasterService.html" data-type="entity-link">ToasterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/UsuarioAdministrador.html" data-type="entity-link">UsuarioAdministrador</a>
                            </li>
                            <li class="link">
                                <a href="guards/UsuarioAlumno.html" data-type="entity-link">UsuarioAlumno</a>
                            </li>
                            <li class="link">
                                <a href="guards/UsuarioAutenticado.html" data-type="entity-link">UsuarioAutenticado</a>
                            </li>
                            <li class="link">
                                <a href="guards/UsuarioProfesor.html" data-type="entity-link">UsuarioProfesor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Cartelera.html" data-type="entity-link">Cartelera</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Comentario.html" data-type="entity-link">Comentario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notificacion.html" data-type="entity-link">Notificacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Post.html" data-type="entity-link">Post</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rol.html" data-type="entity-link">Rol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link">Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioNotificaciones.html" data-type="entity-link">UsuarioNotificaciones</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});