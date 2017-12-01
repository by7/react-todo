var SubmitField = React.createClass({
    handleSubmit: function(event){
        React.findDOMNode(this.refs.textField).focus();
        this.props.submitItem();
        event.preventDefault();
    },
    render: function(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref="textField" value={this.props.text} onChange={this.props.handleChange}/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        );
    },
});

var itemStyle = {
    cursor:'pointer',
    backgroundColor:'LightCyan'
};

var TodoList = React.createClass({
    render: function(){
        var parent = this;
        var todos = this.props.todos.map(function(todo,index){
            return(
                <li key={index}>
                    <span style={itemStyle} onClick={parent.props.handleDelete.bind(null, index)}>
                        {todo}
                    </span>
                </li>
            );
        });
        return(
            <ul>
                {todos}
            </ul>
        );
    },
});

var fontStyle = {
    fontFamily: "Palatino Linotype"
};

var TodoApp = React.createClass({
    getInitialState: function(){
        return {
            text: '',
            todos: ["get food","drive home","eat food", "sleep"],
            completed: []
        }
    },
    handleChange: function(event){
        this.setState({text: event.target.value});
    },
    submitItem: function(event){
        this.setState({
            todos: this.state.todos.concat([this.state.text]),
            text: ''
        });
    },
    handleDelete: function(index){
        var newTodos = this.state.todos.slice();
        var item = newTodos.splice(index, 1);
        this.setState({
            todos: newTodos,
            completed: this.state.completed.concat([item])
        });
    },
    handleUndo: function(index){
        var newCompleted = this.state.completed.slice();
        var item = newCompleted.splice(index, 1);
        this.setState({
            completed: newCompleted,
            todos: this.state.todos.concat([item])
        });
    },
    render: function(){
        return(
            <div style={fontStyle}>
                <h2>Todo List</h2>
                <p>Click items in Todo List to remove. Click items in Completed Tasks to undo remove. </p>
                <SubmitField text={this.state.text} handleChange={this.handleChange} submitItem={this.submitItem} />
                <TodoList todos={this.state.todos} handleDelete={this.handleDelete}/>
                <h3>Completed Tasks</h3>
                <TodoList todos={this.state.completed} handleDelete={this.handleUndo}/>
            </div>
        );
    },
});
React.render(<TodoApp />, document.getElementById('content'));
