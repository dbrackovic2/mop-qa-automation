import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DashboardPage extends Page {
    /**
     * define selectors using getter methods
     */
    get userSettingsBtn() { return $("a[href='/settings']") }
    get eventsTab() { return $("a[href='/events']") }
    get searchEventsSection() { return $("input#search") }
}

export default new DashboardPage();
