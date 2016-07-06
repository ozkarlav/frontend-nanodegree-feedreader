/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        function testUrl(feed) {
            it('urls are defined', function() {
                expect(feed).toBeDefined();
                expect(feed).not.toBe('');
            });
        }
        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        function testName(feed) {
            it('names are defined', function() {
                expect(feed).toBeDefined();
                expect(feed).not.toBe('');
            });
        }

        for (var i = 0; i < allFeeds.length; i++) {
            testUrl(allFeeds[i].url);
            testName(allFeeds[i].name);
        }
    });

    describe('The Menu', function() {
        /* Test ensures the menu element is
         * hidden by default. Analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });
        /* Test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visivility', function() {
            var menuButton = $('.menu-icon-link');

            menuButton.trigger('click');
            expect($('body').hasClass("menu-hidden")).toBeFalsy();
            menuButton.trigger('click');
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });

    });

    describe('Initial Entries', function() {
        /* Test ensures when the loadFeed
         * function is called and completes its work, test if there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should contain feeds', function() {            
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        /* Test ensures when a new feed is loaded
         * by the loadFeed function and that the content actually changes.
         */
        var firstEntry;
        var lastEntry;

        // this gets feed from the first entry
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstEntry = $('.entry').html();
                console.log(firstEntry);
                done();
            });
        });
        // this gets feed from the following entry
        beforeEach(function(done) {
            loadFeed(1, function() {
                lastEntry = $('.entry').html();
                console.log(lastEntry);
                done();
            });
        });
        // compares if both entries are equal or not
        it('should contain different feeds', function() {
            expect(firstEntry).not.toEqual(lastEntry);
        });
    });

}());