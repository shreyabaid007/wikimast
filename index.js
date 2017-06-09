"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var SingleResult = function (_React$Component) {
    _inherits(SingleResult, _React$Component);

    function SingleResult() {
        _classCallCheck(this, SingleResult);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    SingleResult.prototype.render = function render() {
        return React.createElement(
            "a",
            { href: this.props.url, className: "single-result", target: "_blank" },
            React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    this.props.title
                ),
                React.createElement(
                    "p",
                    null,
                    this.props.description
                )
            )
        );
    };

    return SingleResult;
}(React.Component);




var ResultList = function (_React$Component2) {
    _inherits(ResultList, _React$Component2);

    function ResultList() {
        _classCallCheck(this, ResultList);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    ResultList.prototype.render = function render() {
        var _this3 = this;

        var results = this.props.results[1].map(function (result, index) {
            return React.createElement(SingleResult, { key: index, title: _this3.props.results[1][index], description: _this3.props.results[2][index], url: _this3.props.results[3][index] });
        });

        return React.createElement(
            "div",
            { className: "result-list" },
            results
        );
    };

    return ResultList;
}(React.Component);



var SearchForm = function (_React$Component3) {
    _inherits(SearchForm, _React$Component3);

    function SearchForm() {
        _classCallCheck(this, SearchForm);

        var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this));

        _this4.state = {
            searchTerm: ''
        };
        return _this4;
    }

    SearchForm.prototype.handleInputChange = function handleInputChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    };

    SearchForm.prototype.handleSubmit = function handleSubmit(event) {
        event.preventDefault();
        var searchTerm = this.state.searchTerm.trim(); 

        if (!searchTerm) {
            
            return;
        }

        this.props.onSearch(searchTerm); 
        this.setState({ searchTerm: '' });
    };

    SearchForm.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "search-box-container" },
            React.createElement(
                "form",
                { onSubmit: this.handleSubmit.bind(this) },
                React.createElement("input", { className: "search-box-text", type: "text", placeholder: "Search...", onChange: this.handleInputChange.bind(this), value: this.state.searchTerm })
            ),
            React.createElement(
                "p",
                { className: "random-text" },
                React.createElement(
                    "small",
                    null,
                    "or visit a ",
                    React.createElement(
                        "a",
                        { href: "http://en.wikipedia.org/wiki/Special:Random", target: "_blank" },
                        "random article"
                    ),
                    "."
                )
            )
        );
    };

    return SearchForm;
}(React.Component);


//Component-4

var WikipediaViewer = function (_React$Component4) {
    _inherits(WikipediaViewer, _React$Component4);

    function WikipediaViewer() {
        _classCallCheck(this, WikipediaViewer);

        var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this));

        _this5.state = {
            results: ['', [], [], []]
        };
        return _this5;
    }

    WikipediaViewer.prototype.handleSearch = function handleSearch(searchTerm) {
        var _this6 = this;

        $.ajax({
            type: 'GET',
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + searchTerm,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function success(data) {
                _this6.setState({ results: data });
            },
            error: function error(_error) {
                console.error(_error);
            }
        });
    };

    WikipediaViewer.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "wrapper" },
            React.createElement(SearchForm, { onSearch: this.handleSearch.bind(this) }),
            React.createElement(ResultList, { results: this.state.results })
        );
    };

    return WikipediaViewer;
}(React.Component);

ReactDOM.render(React.createElement(WikipediaViewer, null), document.getElementById('wikipedia-viewer'));