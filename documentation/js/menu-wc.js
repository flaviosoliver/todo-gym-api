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
                                            'data-bs-target="#controllers-links-module-AppModule-b6bf02e214b805611785651c36cc1d670c56cceb7679474d82915d49a65d391aa29b8344459a7b8faf911b6749bd3ccde238357089f59cae2c4d8c4aa44e190f"' : 'data-bs-target="#xs-controllers-links-module-AppModule-b6bf02e214b805611785651c36cc1d670c56cceb7679474d82915d49a65d391aa29b8344459a7b8faf911b6749bd3ccde238357089f59cae2c4d8c4aa44e190f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b6bf02e214b805611785651c36cc1d670c56cceb7679474d82915d49a65d391aa29b8344459a7b8faf911b6749bd3ccde238357089f59cae2c4d8c4aa44e190f"' :
                                            'id="xs-controllers-links-module-AppModule-b6bf02e214b805611785651c36cc1d670c56cceb7679474d82915d49a65d391aa29b8344459a7b8faf911b6749bd3ccde238357089f59cae2c4d8c4aa44e190f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b6bf02e214b805611785651c36cc1d670c56cceb7679474d82915d49a65d391aa29b8344459a7b8faf911b6749bd3ccde238357089f59cae2c4d8c4aa44e190f"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b6bf02e214b805611785651c36cc1d670c56cceb7679474d82915d49a65d391aa29b8344459a7b8faf911b6749bd3ccde238357089f59cae2c4d8c4aa44e190f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b6bf02e214b805611785651c36cc1d670c56cceb7679474d82915d49a65d391aa29b8344459a7b8faf911b6749bd3ccde238357089f59cae2c4d8c4aa44e190f"' :
                                        'id="xs-injectables-links-module-AppModule-b6bf02e214b805611785651c36cc1d670c56cceb7679474d82915d49a65d391aa29b8344459a7b8faf911b6749bd3ccde238357089f59cae2c4d8c4aa44e190f"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-469a9e7b1dfc921e0c4fed3e7215cdd2d2520026acfd1eb91ccbaecf364d2cc1ff2201abee5cd71068b3d2b4980196a74c37a649f9ffde270e989a56907a4b13"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-469a9e7b1dfc921e0c4fed3e7215cdd2d2520026acfd1eb91ccbaecf364d2cc1ff2201abee5cd71068b3d2b4980196a74c37a649f9ffde270e989a56907a4b13"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-469a9e7b1dfc921e0c4fed3e7215cdd2d2520026acfd1eb91ccbaecf364d2cc1ff2201abee5cd71068b3d2b4980196a74c37a649f9ffde270e989a56907a4b13"' :
                                            'id="xs-controllers-links-module-AuthModule-469a9e7b1dfc921e0c4fed3e7215cdd2d2520026acfd1eb91ccbaecf364d2cc1ff2201abee5cd71068b3d2b4980196a74c37a649f9ffde270e989a56907a4b13"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-469a9e7b1dfc921e0c4fed3e7215cdd2d2520026acfd1eb91ccbaecf364d2cc1ff2201abee5cd71068b3d2b4980196a74c37a649f9ffde270e989a56907a4b13"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-469a9e7b1dfc921e0c4fed3e7215cdd2d2520026acfd1eb91ccbaecf364d2cc1ff2201abee5cd71068b3d2b4980196a74c37a649f9ffde270e989a56907a4b13"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-469a9e7b1dfc921e0c4fed3e7215cdd2d2520026acfd1eb91ccbaecf364d2cc1ff2201abee5cd71068b3d2b4980196a74c37a649f9ffde270e989a56907a4b13"' :
                                        'id="xs-injectables-links-module-AuthModule-469a9e7b1dfc921e0c4fed3e7215cdd2d2520026acfd1eb91ccbaecf364d2cc1ff2201abee5cd71068b3d2b4980196a74c37a649f9ffde270e989a56907a4b13"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExercisesModule.html" data-type="entity-link" >ExercisesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExercisesModule-8f339a64ff2ff3e5fcd7fcdd25f35d74420023015dbce6c3b7674700cb26b58b357474944e4ec323e832e33d2a6f0e6bdfae98a0849f8b49cc1ea65667490765"' : 'data-bs-target="#xs-controllers-links-module-ExercisesModule-8f339a64ff2ff3e5fcd7fcdd25f35d74420023015dbce6c3b7674700cb26b58b357474944e4ec323e832e33d2a6f0e6bdfae98a0849f8b49cc1ea65667490765"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExercisesModule-8f339a64ff2ff3e5fcd7fcdd25f35d74420023015dbce6c3b7674700cb26b58b357474944e4ec323e832e33d2a6f0e6bdfae98a0849f8b49cc1ea65667490765"' :
                                            'id="xs-controllers-links-module-ExercisesModule-8f339a64ff2ff3e5fcd7fcdd25f35d74420023015dbce6c3b7674700cb26b58b357474944e4ec323e832e33d2a6f0e6bdfae98a0849f8b49cc1ea65667490765"' }>
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
                                            'data-bs-target="#controllers-links-module-PlansModule-78b14829312f46bd9ae095cfadecafa18b256b306fe739650ec4ef97d26e1dd5c95a411dbbf870efd7f7536daeab8e4e66e85eef5a117a3550492ec973feafc8"' : 'data-bs-target="#xs-controllers-links-module-PlansModule-78b14829312f46bd9ae095cfadecafa18b256b306fe739650ec4ef97d26e1dd5c95a411dbbf870efd7f7536daeab8e4e66e85eef5a117a3550492ec973feafc8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlansModule-78b14829312f46bd9ae095cfadecafa18b256b306fe739650ec4ef97d26e1dd5c95a411dbbf870efd7f7536daeab8e4e66e85eef5a117a3550492ec973feafc8"' :
                                            'id="xs-controllers-links-module-PlansModule-78b14829312f46bd9ae095cfadecafa18b256b306fe739650ec4ef97d26e1dd5c95a411dbbf870efd7f7536daeab8e4e66e85eef5a117a3550492ec973feafc8"' }>
                                            <li class="link">
                                                <a href="controllers/PlansController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlansController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PlansModule-78b14829312f46bd9ae095cfadecafa18b256b306fe739650ec4ef97d26e1dd5c95a411dbbf870efd7f7536daeab8e4e66e85eef5a117a3550492ec973feafc8"' : 'data-bs-target="#xs-injectables-links-module-PlansModule-78b14829312f46bd9ae095cfadecafa18b256b306fe739650ec4ef97d26e1dd5c95a411dbbf870efd7f7536daeab8e4e66e85eef5a117a3550492ec973feafc8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlansModule-78b14829312f46bd9ae095cfadecafa18b256b306fe739650ec4ef97d26e1dd5c95a411dbbf870efd7f7536daeab8e4e66e85eef5a117a3550492ec973feafc8"' :
                                        'id="xs-injectables-links-module-PlansModule-78b14829312f46bd9ae095cfadecafa18b256b306fe739650ec4ef97d26e1dd5c95a411dbbf870efd7f7536daeab8e4e66e85eef5a117a3550492ec973feafc8"' }>
                                        <li class="link">
                                            <a href="injectables/PlansService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlansService</a>
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
                                <a href="classes/PlansRepository.html" data-type="entity-link" >PlansRepository</a>
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
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlansService.html" data-type="entity-link" >PlansService</a>
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