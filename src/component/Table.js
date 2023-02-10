import React, { Component } from "react";
// import Header from "./component/Header";

export class Table extends Component {
  articles = [];
  //   search= ''
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      search: "",
      isAscend: false,
      selectedF: "",
      userNo: 0,
      showPageNo: 25,
      userNo1: 0,
      showPageNo1: 50,
    };
  }
  onChange = (e) => {
    // console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state.search);
  };
  async componentDidMount() {
    let url = "https://dev.ylytic.com/ylytic/test";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.comments });
  }
  sortAt = () => {
    if (this.state.isAscend === false) {
      this.setState(
        this.state.articles.sort((a, b) => a.at.localeCompare(b.at))
      );
      this.setState({ isAscend: true });
    }
    if (this.state.isAscend === true) {
      this.setState(
        this.state.articles.sort((b, a) => a.at.localeCompare(b.at))
      );
      this.setState({ isAscend: false });
    }
  };
  sortAuthor = () => {
    if (this.state.isAscend === false) {
      this.setState(
        this.state.articles.sort((a, b) => a.author.localeCompare(b.author))
      );
      this.setState({ isAscend: true });
    }
    if (this.state.isAscend === true) {
      this.setState(
        this.state.articles.sort((b, a) => a.author.localeCompare(b.author))
      );
      this.setState({ isAscend: false });
    }
  };
  sortLike = () => {
    if (this.state.isAscend === false) {
      this.setState(
        this.state.articles.sort((a, b) => (a.like > b.like ? 1 : -1))
      );
      this.setState({ isAscend: true });
    }
    if (this.state.isAscend === true) {
      this.setState(
        this.state.articles.sort((a, b) => (b.like > a.like ? 1 : -1))
      );
      this.setState({ isAscend: false });
    }
  };
  sortReply = () => {
    if (this.state.isAscend === false) {
      this.setState(
        this.state.articles.sort((a, b) => (a.reply > b.reply ? 1 : -1))
      );
      this.setState({ isAscend: true });
    }
    if (this.state.isAscend === true) {
      this.setState(
        this.state.articles.sort((a, b) => (b.reply > a.reply ? 1 : -1))
      );
      this.setState({ isAscend: false });
    }
  };
  sortComment = () => {
    if (this.state.isAscend === false) {
      this.setState(
        this.state.articles.sort((a, b) => (a.text > b.text ? 1 : -1))
      );
      this.setState({ isAscend: true });
    }
    if (this.state.isAscend === true) {
      this.setState(
        this.state.articles.sort((a, b) => (b.text > a.text ? 1 : -1))
      );
      this.setState({ isAscend: false });
    }
  };
  changeOptions = (e) => {
    this.setState({ selectedF: e.target.value });
    console.log(this.state.selectedF)
    if (this.state.selectedF === "twentyFive") {
      this.setState(
        this.state.articles.slice(this.state.userNo, this.state.showPageNo)
      );
    }
    if (this.state.selectedF === "Fifty") {
      this.setState(
        this.state.articles.slice(this.state.userNo1, this.state.showPageNo1)
      );
    }
    if (this.state.selectedF === "Hundred") {
      this.setState(
        this.state.articles.slice(this.state.userNo, this.state.articles.length)
      );
    }
  };
//   showTwentyFive = () => {
//     this.setState(
//         this.state.articles.slice(this.state.userNo, this.state.showPageNo)
//       );
//   }
//   showFify = () => {
//     this.setState(
//         this.state.articles.slice(this.state.userNo1, this.state.showPageNo1)
//       );
//   }
//   showHundred = () => {
//     this.setState(
//         this.state.articles.slice(this.state.userNo, this.state.articles.length)
//       );
//   }
  render() {
    return (
      <>
        <div className="container my-3">
          <h2 style={{ textAlign: "center" }}>Render Functions</h2>
          <div className="mx-4" style={{ display: "flex" }}>
            <input
              style={{ width: "40%" }}
              type="text"
              placeholder="Filter"
              name="search"
              value={this.state.search}
              className="form-control"
              onChange={this.onChange}
            />
            <a className="mx-5 my-2" href="">Source</a>
            <p className="mx-5 my-2">{this.state.articles.length} records</p>
            <select
              className="form-select mx-2"
              style={{ width: "40%", alignContent: "right" }}
              aria-label="Default select example"
              onChange={this.changeOptions}
            >
              <option value="twentyFive" onClick={this.showTwentyFive}>25 per page</option>
              <option value="Fifty" onClick={this.showFify}>50 per page</option>
              <option value="Hundred" onClick={this.showHundred}>100 per page</option>
            </select>
          </div>
          <table className="table my-3 ">
            <thead>
              <tr>
                <th scope="col" onClick={this.sortAt}>
                  At
                </th>
                <th scope="col" onClick={this.sortAuthor}>
                  Author
                </th>
                <th scope="col" onClick={this.sortLike}>
                  Like
                </th>
                <th scope="col" onClick={this.sortReply}>
                  Reply
                </th>
                <th scope="col" onClick={this.sortComment}>
                  Comment
                </th>
              </tr>
            </thead>
            {this.state.articles
              .filter((val) => {
                if (this.state.search === "") {
                  return val;
                } else if (
                  val.at.includes(this.state.search) ||
                  val.author.includes(this.state.search) ||
                  val.text.includes(this.state.search)
                ) {
                  return val;
                }
              })
              .map((element) => {
                return (
                  <tbody key={element.at}>
                    <tr>
                      <td>{element.at}</td>
                      <td>{element.author}</td>
                      <td>{element.like}</td>
                      <td>{element.reply}</td>
                      <td>{element.text}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </>
    );
  }
}

export default Table;
