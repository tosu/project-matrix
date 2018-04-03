export default class Matrix extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      m: 5,
      n: 5,
      result: null,
    }

    this.fields = [];
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Matrix Spiral</h1>
        
        <div className="box">
          <h3>size:</h3>
          <input type="text" onChange={(e) => this.setState({m: parseInt(e.target.value)})} className="matrix-field" defaultValue={this.state.m} />x
          <input type="text" onChange={(e) => this.setState({n: parseInt(e.target.value)})} className="matrix-field" defaultValue={this.state.n} />
        </div>

        <div className="box">
          <h3>values:</h3>
          {this.renderFields()}
        </div>

        <div className="box">
          <input type="button" defaultValue="Result" onClick={this.result.bind(this)} className="btn" />
        </div>

        <div className="box">
          {this.state.result}
        </div>
      </div>
    )
  }

  renderFields() {
    this.fields = [];

    var rows = [];
    for (var x = 0; x < this.state.m; x++) {
      var columns = [];
      for (var y = 0; y < this.state.n; y++) {
        var key = "col-" + x.toString() + y.toString();
        var field = <Field ref={key} x={x} y={y} key={key} />;
        this.fields.push(field);
        columns.push(field);
      }
      rows.push(<div key={"row-" + x} >{columns}</div>);
    }
    return rows;
  }

  result() {
    var _this = this;
    var numbers = [];
    for (var index in this.fields) {
      numbers.push(this.refs[this.fields[index].ref].getValue())
    }

    $.ajax({
      url: "/matrixes",
      method: "POST",
      data: {numbers: numbers.join(','), m: this.state.m, n: this.state.n},
      success: (e) => {
        _this.setState({result: e.data})
      }
    })
  }
}

class Field extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }

  getValue() {
    return this.state.value;
  }

  render() {
    return (
       <input onChange={(e) => this.setState({value: e.target.value})} type="text" className="matrix-field" />
    )
  }
}
