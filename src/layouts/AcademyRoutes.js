/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Matches from 'components/dashboards/matches';
import Users from 'components/dashboards/users';
import CreateMatch from 'components/dashboards/create-match/CreateMatch';
import UserInvite from 'components/dashboards/invite-user/UserInvite';
import MatchResult from 'components/dashboards/match-result';
import ProtectedRoute from 'ProtectedRoute';
import Profile from 'components/dashboards/academy/profile';

const MainRoutes = () => (
  <Switch>
    {/*Dashboard*/}

    {/* <Route path="/dashboard/analytics" exact component={Analytics} /> */}
    {/* <Route path="/dashboard/crm" exact component={Crm} /> */}
    {/* <Route path="/dashboard/saas" exact component={Saas} /> */}

    {/* {/\*Pages*\/} */}
    {/* <Route path="/pages/starter" exact component={Starter} /> */}
    {/* <Route path="/faq/faq-alt" exact component={FaqAlt} /> */}
    {/* <Route path="/faq/faq-basic" exact component={FaqBasic} /> */}
    {/* <Route path="/faq/faq-accordion" exact component={FaqAccordion} /> */}
    {/* <Route path="/pricing/pricing-default" exact component={PricingDefault} /> */}
    {/* <Route path="/pricing/pricing-alt" exact component={PricingAlt} /> */}
    {/* <Route */}
    {/*   path="/miscellaneous/privacy-policy" */}
    {/*   exact */}
    {/*   component={PrivacyPolicy} */}
    {/* /> */}
    {/* <Route path="/miscellaneous/invite-people" exact component={InvitePeople} /> */}

    {/* {/\* E Commerce *\/} */}
    {/* <Route path="/e-commerce" component={ECommerceRoutes} /> */}
    {/* {/\*icons*\/} */}
    {/* <Route path="/icons/font-awesome" exact component={FontAwesome} /> */}
    {/* <Route path="/dashboard/e-commerce" exact component={ECommerce} /> */}
    {/* <Route path="/dashboard/project-management" exact component={Management} /> */}

    {/* {/\*App*\/} */}
    {/* <Route path="/app/calendar" exact component={Calendar} /> */}
    {/* <Route path="/app/chat" exact component={Chat} /> */}
    {/* <Route path="/social/feed" exact component={Feed} /> */}
    {/* <Route path="/social/activity-log" exact component={ActivityLog} /> */}
    {/* <Route path="/social/notifications" exact component={Notifications} /> */}
    {/* <Route path="/social/followers" exact component={Followers} /> */}
    {/* <Route path="/events/event-detail" exact component={EventDetail} /> */}
    {/* <Route path="/events/create-an-event" exact component={CreateEvent} /> */}
    {/* <Route path="/events/event-list" exact component={EventList} /> */}
    {/* {/\* Email *\/} */}
    {/* <Route path="/email" component={EmailRoutes} /> */}

    {/* {/\* E Commerce *\/} */}
    {/* <Route path="/e-commerce" component={ECommerceRoutes} /> */}

    {/* {/\*Pages*\/} */}
    {/* <Route path="/pages/starter" exact component={Starter} /> */}
    {/* <Route path="/user/profile" exact component={Profile} /> */}
    {/* <Route path="/user/settings" exact component={Settings} /> */}
    {/* <Route path="/miscellaneous/associations" exact component={Associations} /> */}
    {/* <Route path="/faq/faq-alt" exact component={FaqAlt} /> */}
    {/* <Route path="/faq/faq-basic" exact component={FaqBasic} /> */}
    {/* <Route path="/faq/faq-accordion" exact component={FaqAccordion} /> */}
    {/* <Route path="/pricing/pricing-default" exact component={PricingDefault} /> */}
    {/* <Route path="/pricing/pricing-alt" exact component={PricingAlt} /> */}
    {/* <Route */}
    {/*   path="/miscellaneous/privacy-policy" */}
    {/*   exact */}
    {/*   component={PrivacyPolicy} */}
    {/* /> */}
    {/* <Route path="/miscellaneous/invite-people" exact component={InvitePeople} /> */}

    {/* {/\*icons*\/} */}
    {/* <Route path="/icons/font-awesome" exact component={FontAwesome} /> */}

    {/* {/\*Components*\/} */}
    {/* <Route path="/components/alerts" exact component={Alerts} /> */}
    {/* <Route path="/components/accordion" exact component={Accordion} /> */}
    {/* <Route path="/components/animated-icons" exact component={AnimatedIcons} /> */}
    {/* <Route path="/components/badges" exact component={Badges} /> */}
    {/* <Route path="/components/breadcrumb" exact component={Breadcrumbs} /> */}
    {/* <Route path="/components/buttons" exact component={Buttons} /> */}
    {/* <Route path="/components/cards" exact component={Cards} /> */}
    {/* <Route path="/components/dropdowns" exact component={Dropdowns} /> */}
    {/* <Route path="/components/list-group" exact component={ListGroups} /> */}
    {/* <Route path="/components/modals" exact component={Modals} /> */}
    {/* <Route path="/components/offcanvas" exact component={Offcanvas} /> */}
    {/* <Route path="/components/pagination" exact component={Pagination} /> */}
    {/* <Route path="/components/progress-bar" exact component={BasicProgressBar} /> */}
    {/* <Route path="/components/placeholder" exact component={Placeholder} /> */}
    {/* <Route path="/components/spinners" exact component={Spinners} /> */}
    {/* <Route path="/components/toasts" exact component={Toasts} /> */}
    {/* <Route path="/components/pictures/avatar" exact component={Avatar} /> */}
    {/* <Route path="/components/pictures/images" exact component={Image} /> */}
    {/* <Route path="/components/pictures/figures" exact component={Figures} /> */}
    {/* <Route path="/components/pictures/hoverbox" exact component={Hoverbox} /> */}
    {/* <Route path="/components/pictures/lightbox" exact component={Lightbox} /> */}
    {/* <Route path="/components/tooltips" exact component={Tooltips} /> */}
    {/* <Route path="/components/popovers" exact component={Popovers} /> */}
    {/* <Route */}
    {/*   path="/components/carousel/bootstrap" */}
    {/*   exact */}
    {/*   component={BootstrapCarousel} */}
    {/* /> */}
    {/* <Route path="/components/carousel/slick" exact component={SlickCarousel} /> */}
    {/* <Route path="/components/navs-and-tabs/navs" exact component={Navs} /> */}
    {/* <Route path="/tables/basic-tables" exact component={Tables} /> */}

    <ProtectedRoute path="/dashboard/matches" exact component={Matches} />
    <ProtectedRoute
      path="/dashboard/create-match"
      exact
      component={CreateMatch}
    />
    <ProtectedRoute path="/dashboard/users" exact component={Users} />
    <ProtectedRoute
      path="/dashboard/match-result/:academyId/:matchid"
      exact
      component={MatchResult}
    />
    <ProtectedRoute
      path="/dashboard/invite-user"
      exact
      component={UserInvite}
    />
    <ProtectedRoute path="/dashboard/profile" exact component={Profile} />
    {/* <Route path="/forms/basic/form-control" exact component={FormControl} /> */}
    {/* <Route path="/forms/basic/input-group" exact component={InputGroup} /> */}
    {/* <Route path="/forms/basic/select" exact component={Select} /> */}
    {/* <Route path="/forms/basic/checks" exact component={Checks} /> */}
    {/* <Route path="/forms/basic/range" exact component={Range} /> */}
    {/* <Route path="/forms/basic/layout" exact component={FormLayout} /> */}
    {/* <Route path="/forms/advance/date-picker" exact component={DatePicker} /> */}
    {/* <Route path="/forms/advance/editor" exact component={Editor} /> */}
    {/* <Route */}
    {/*   path="/forms/advance/advance-select" */}
    {/*   exact */}
    {/*   component={AdvanceSelect} */}
    {/* /> */}
    {/* <Route path="/forms/advance/file-uploader" exact component={FileUploader} /> */}
    {/* <Route path="/forms/advance/rating" exact component={Rating} /> */}
    {/* <Route path="/forms/floating-labels" exact component={FloatingLabels} /> */}
    {/* <Route path="/forms/validation" exact component={FormValidation} /> */}
    {/* <Route path="/forms/wizard" exact component={WizardForms} /> */}
    {/* <Route path="/components/navs-and-tabs/navbar" exact component={Navbars} /> */}
    {/* <Route path="/components/navs-and-tabs/tabs" exact component={Tabs} /> */}
    {/* <Route path="/components/collapse" exact component={Collapse} /> */}
    {/* <Route path="/components/videos/embed" exact component={Embed} /> */}
    {/* <Route path="/components/background" exact component={Background} /> */}
    {/* <Route path="/components/search" exact component={Search} /> */}
    {/* <Route path="/components/typed-text" exact component={TypedText} /> */}
    {/* <Route */}
    {/*   path="/components/navs-and-tabs/vertical-navbar" */}
    {/*   exact */}
    {/*   component={VerticalNavbar} */}
    {/* /> */}
    {/* <Route */}
    {/*   path="/components/navs-and-tabs/top-navbar" */}
    {/*   exact */}
    {/*   component={NavBarTop} */}
    {/* /> */}
    {/* <Route */}
    {/*   path="/components/navs-and-tabs/combo-navbar" */}
    {/*   exact */}
    {/*   component={ComboNavbar} */}
    {/* /> */}

    {/* {/\*Utilities*\/} */}
    {/* <Route path="/utilities/borders" exact component={Borders} /> */}
    {/* <Route path="/utilities/colors" exact component={Colors} /> */}
    {/* <Route path="/utilities/colored-links" exact component={ColoredLinks} /> */}
    {/* <Route path="/utilities/display" exact component={Display} /> */}
    {/* <Route path="/utilities/visibility" exact component={Visibility} /> */}
    {/* <Route path="/utilities/stretched-link" exact component={StretchedLink} /> */}
    {/* <Route path="/utilities/stretched-link" exact component={StretchedLink} /> */}
    {/* <Route path="/utilities/float" exact component={Float} /> */}
    {/* <Route path="/utilities/position" exact component={Position} /> */}
    {/* <Route path="/utilities/spacing" exact component={Spacing} /> */}
    {/* <Route path="/utilities/sizing" exact component={Sizing} /> */}
    {/* <Route path="/utilities/text-truncation" exact component={TextTruncation} /> */}
    {/* <Route path="/utilities/typography" exact component={Typography} /> */}
    {/* <Route path="/utilities/vertical-align" exact component={VerticalAlign} /> */}
    {/* <Route path="/utilities/flex" exact component={Flex} /> */}
    {/* <Route path="/utilities/grid" exact component={Grid} /> */}

    {/* {/\*Documentation*\/} */}
    {/* <Route */}
    {/*   path="/documentation/getting-started" */}
    {/*   exact */}
    {/*   component={GettingStarted} */}
    {/* /> */}
    {/* <Route */}
    {/*   path="/documentation/configuration" */}
    {/*   exact */}
    {/*   component={Configuration} */}
    {/* /> */}
    {/* <Route path="/documentation/styling" exact component={Styling} /> */}
    {/* <Route path="/documentation/dark-mode" exact component={DarkMode} /> */}
    {/* <Route path="/documentation/plugin" exact component={Plugins} /> */}
    {/* <Route path="/documentation/design-file" exact component={DesignFile} /> */}
    {/* <Route path="/changelog" exact component={Changelog} /> */}
    {/* <Route path="/authentication-modal" component={ModalAuth} /> */}
    {/* {/\*Coming Soon*\/} */}
    {/* <Route */}
    {/*   path={inActiveRoutes.map(route => route.to)} */}
    {/*   exact */}
    {/*   component={ComingSoon} */}
    {/* /> */}

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);
export default MainRoutes;
