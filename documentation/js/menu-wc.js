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
                    <a href="index.html" data-type="index-link">todo-gym-api documentation</a>
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
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-853d0ab9c717c46ac84868acdda50b475b8e814d8dc64c7a7405516c4cf302b22d8fe1496e405937f1fdec87bcc8c171a9ca19bb05495e8054551be6d219f088"' : 'data-bs-target="#xs-controllers-links-module-AppModule-853d0ab9c717c46ac84868acdda50b475b8e814d8dc64c7a7405516c4cf302b22d8fe1496e405937f1fdec87bcc8c171a9ca19bb05495e8054551be6d219f088"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-853d0ab9c717c46ac84868acdda50b475b8e814d8dc64c7a7405516c4cf302b22d8fe1496e405937f1fdec87bcc8c171a9ca19bb05495e8054551be6d219f088"' :
                                            'id="xs-controllers-links-module-AppModule-853d0ab9c717c46ac84868acdda50b475b8e814d8dc64c7a7405516c4cf302b22d8fe1496e405937f1fdec87bcc8c171a9ca19bb05495e8054551be6d219f088"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-853d0ab9c717c46ac84868acdda50b475b8e814d8dc64c7a7405516c4cf302b22d8fe1496e405937f1fdec87bcc8c171a9ca19bb05495e8054551be6d219f088"' : 'data-bs-target="#xs-injectables-links-module-AppModule-853d0ab9c717c46ac84868acdda50b475b8e814d8dc64c7a7405516c4cf302b22d8fe1496e405937f1fdec87bcc8c171a9ca19bb05495e8054551be6d219f088"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-853d0ab9c717c46ac84868acdda50b475b8e814d8dc64c7a7405516c4cf302b22d8fe1496e405937f1fdec87bcc8c171a9ca19bb05495e8054551be6d219f088"' :
                                        'id="xs-injectables-links-module-AppModule-853d0ab9c717c46ac84868acdda50b475b8e814d8dc64c7a7405516c4cf302b22d8fe1496e405937f1fdec87bcc8c171a9ca19bb05495e8054551be6d219f088"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-74f0a1b59f4e1e38a508c83912bb090ca19a1e068c88c56518da1e597c393806182a880953d8778b68b877e0b24890cdb90f5368bc5387f92f7e45fe99ec5c14"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-74f0a1b59f4e1e38a508c83912bb090ca19a1e068c88c56518da1e597c393806182a880953d8778b68b877e0b24890cdb90f5368bc5387f92f7e45fe99ec5c14"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-74f0a1b59f4e1e38a508c83912bb090ca19a1e068c88c56518da1e597c393806182a880953d8778b68b877e0b24890cdb90f5368bc5387f92f7e45fe99ec5c14"' :
                                            'id="xs-controllers-links-module-AuthModule-74f0a1b59f4e1e38a508c83912bb090ca19a1e068c88c56518da1e597c393806182a880953d8778b68b877e0b24890cdb90f5368bc5387f92f7e45fe99ec5c14"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExercisesModule.html" data-type="entity-link" >ExercisesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExercisesModule-af5261e51e8fd363df95669834023a735baaa0dad69e7b3b9f9d044b22279e709a20ce0991ba52b78ae442b7d059868d2bcbe5b8890d15c6e12f496108ad387f"' : 'data-bs-target="#xs-controllers-links-module-ExercisesModule-af5261e51e8fd363df95669834023a735baaa0dad69e7b3b9f9d044b22279e709a20ce0991ba52b78ae442b7d059868d2bcbe5b8890d15c6e12f496108ad387f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExercisesModule-af5261e51e8fd363df95669834023a735baaa0dad69e7b3b9f9d044b22279e709a20ce0991ba52b78ae442b7d059868d2bcbe5b8890d15c6e12f496108ad387f"' :
                                            'id="xs-controllers-links-module-ExercisesModule-af5261e51e8fd363df95669834023a735baaa0dad69e7b3b9f9d044b22279e709a20ce0991ba52b78ae442b7d059868d2bcbe5b8890d15c6e12f496108ad387f"' }>
                                            <li class="link">
                                                <a href="controllers/ExercisesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExercisesController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlansModule.html" data-type="entity-link" >PlansModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PlansModule-2c20e37653ab9b1277afb84f060ee6a56d5ddab8048e344f8cd51d5173869858b992ca861db837cd786f6ccefc3f42d4527d5495e6a7c1ee352a49d066d3c177"' : 'data-bs-target="#xs-controllers-links-module-PlansModule-2c20e37653ab9b1277afb84f060ee6a56d5ddab8048e344f8cd51d5173869858b992ca861db837cd786f6ccefc3f42d4527d5495e6a7c1ee352a49d066d3c177"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlansModule-2c20e37653ab9b1277afb84f060ee6a56d5ddab8048e344f8cd51d5173869858b992ca861db837cd786f6ccefc3f42d4527d5495e6a7c1ee352a49d066d3c177"' :
                                            'id="xs-controllers-links-module-PlansModule-2c20e37653ab9b1277afb84f060ee6a56d5ddab8048e344f8cd51d5173869858b992ca861db837cd786f6ccefc3f42d4527d5495e6a7c1ee352a49d066d3c177"' }>
                                            <li class="link">
                                                <a href="controllers/PlansController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlansController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoutinesModule.html" data-type="entity-link" >RoutinesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoutinesModule-618aa95f24ac582809c59647f71989c51041ed0478b43d85147342dc1d96b2b1a795ad2534e9bea2a162819bde0575cb02cd9190c0c2cd31932347dff9fd1013"' : 'data-bs-target="#xs-controllers-links-module-RoutinesModule-618aa95f24ac582809c59647f71989c51041ed0478b43d85147342dc1d96b2b1a795ad2534e9bea2a162819bde0575cb02cd9190c0c2cd31932347dff9fd1013"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoutinesModule-618aa95f24ac582809c59647f71989c51041ed0478b43d85147342dc1d96b2b1a795ad2534e9bea2a162819bde0575cb02cd9190c0c2cd31932347dff9fd1013"' :
                                            'id="xs-controllers-links-module-RoutinesModule-618aa95f24ac582809c59647f71989c51041ed0478b43d85147342dc1d96b2b1a795ad2534e9bea2a162819bde0575cb02cd9190c0c2cd31932347dff9fd1013"' }>
                                            <li class="link">
                                                <a href="controllers/RoutinesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutinesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoutinesModule-618aa95f24ac582809c59647f71989c51041ed0478b43d85147342dc1d96b2b1a795ad2534e9bea2a162819bde0575cb02cd9190c0c2cd31932347dff9fd1013"' : 'data-bs-target="#xs-injectables-links-module-RoutinesModule-618aa95f24ac582809c59647f71989c51041ed0478b43d85147342dc1d96b2b1a795ad2534e9bea2a162819bde0575cb02cd9190c0c2cd31932347dff9fd1013"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoutinesModule-618aa95f24ac582809c59647f71989c51041ed0478b43d85147342dc1d96b2b1a795ad2534e9bea2a162819bde0575cb02cd9190c0c2cd31932347dff9fd1013"' :
                                        'id="xs-injectables-links-module-RoutinesModule-618aa95f24ac582809c59647f71989c51041ed0478b43d85147342dc1d96b2b1a795ad2534e9bea2a162819bde0575cb02cd9190c0c2cd31932347dff9fd1013"' }>
                                        <li class="link">
                                            <a href="injectables/RoutinesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutinesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-50a641d7c929c0c37a5f8dfa7cc3de50fba35c741d0439b03f965594f1169b19948c6bfc3909c0ae1bfb437b56652557002b0fcaa725e206cff3e233670c49a9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-50a641d7c929c0c37a5f8dfa7cc3de50fba35c741d0439b03f965594f1169b19948c6bfc3909c0ae1bfb437b56652557002b0fcaa725e206cff3e233670c49a9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-50a641d7c929c0c37a5f8dfa7cc3de50fba35c741d0439b03f965594f1169b19948c6bfc3909c0ae1bfb437b56652557002b0fcaa725e206cff3e233670c49a9"' :
                                            'id="xs-controllers-links-module-UsersModule-50a641d7c929c0c37a5f8dfa7cc3de50fba35c741d0439b03f965594f1169b19948c6bfc3909c0ae1bfb437b56652557002b0fcaa725e206cff3e233670c49a9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ExercisesController.html" data-type="entity-link" >ExercisesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PlansController.html" data-type="entity-link" >PlansController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RoutinesController.html" data-type="entity-link" >RoutinesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthDto.html" data-type="entity-link" >AuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExerciseDto.html" data-type="entity-link" >CreateExerciseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlanDto.html" data-type="entity-link" >CreatePlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Exercise.html" data-type="entity-link" >Exercise</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExerciseDto.html" data-type="entity-link" >ExerciseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParamsDto.html" data-type="entity-link" >ParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Plan.html" data-type="entity-link" >Plan</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlanDto.html" data-type="entity-link" >PlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshToken.html" data-type="entity-link" >RefreshToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Routine.html" data-type="entity-link" >Routine</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShapeHistory.html" data-type="entity-link" >ShapeHistory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShapeHistoryDto.html" data-type="entity-link" >ShapeHistoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Training.html" data-type="entity-link" >Training</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrainingDto.html" data-type="entity-link" >TrainingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrainingUpdateDto.html" data-type="entity-link" >TrainingUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlanDto.html" data-type="entity-link" >UpdatePlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" >AccessTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthRepository.html" data-type="entity-link" >AuthRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExercisesRepository.html" data-type="entity-link" >ExercisesRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExercisesService.html" data-type="entity-link" >ExercisesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlansRepository.html" data-type="entity-link" >PlansRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlansService.html" data-type="entity-link" >PlansService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenGuard.html" data-type="entity-link" >RefreshTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" >RefreshTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoutinesRepository.html" data-type="entity-link" >RoutinesRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoutinesService.html" data-type="entity-link" >RoutinesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersRepository.html" data-type="entity-link" >UsersRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAuthController.html" data-type="entity-link" >IAuthController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthRepository.html" data-type="entity-link" >IAuthRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthService.html" data-type="entity-link" >IAuthService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDefaultController.html" data-type="entity-link" >IDefaultController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExercisesController.html" data-type="entity-link" >IExercisesController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExercisesRepository.html" data-type="entity-link" >IExercisesRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExercisesService.html" data-type="entity-link" >IExercisesService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlansController.html" data-type="entity-link" >IPlansController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlansRepository.html" data-type="entity-link" >IPlansRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlansService.html" data-type="entity-link" >IPlansService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsersController.html" data-type="entity-link" >IUsersController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsersRepository.html" data-type="entity-link" >IUsersRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsersService.html" data-type="entity-link" >IUsersService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});