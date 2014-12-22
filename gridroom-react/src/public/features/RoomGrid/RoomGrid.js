window.onload = function onDocumentReady(){
	var GridSpace = React.createClass({
		displayName: 'Grid Space',
		render: function(){
			return (
				React.createElement('div', {className: 'grid-space'}, '')
			);
		}
	});

	var gridRows = [];
	for(var i = 0; i < 10; i++){
		gridRows[i] = [];
		for(var j = 0; j < 10; j++){
			var props = {key: 'gridRow' + i + 'Col' + j, className: 'grid-space'};
			if(j == 0){
				props.className += ' grid-first-col';
			}
			if(i == 0){
				props.className += ' grid-first-row';
			}
			gridRows[i][j] = React.createElement('div', props);
		}
	}
	
	var keygen = {
		num: 0,
		next: function next(){
			keygen.num++;
			return 'uniquekey' + keygen.num;
		}
	};
	
	function toGridRow(gridrow){
		return React.createElement('div', {key: keygen.next(), className: 'grid-row'}, gridrow);
	}
	
	var RoomGrid = React.createClass({
		displayName: 'Room Grid',
		render: function(){
			return (
				React.createElement('div', {className: 'room-grid'},
				_.chain(gridRows).map(toGridRow).value())
			);
		}
	});

	var domx = React.DOM;
	function toRow(data){
        return domx.tr({key: 'uniquekeyTR' + data}, domx.td({key: 'uniquekeyTD' + data}, data));
	}
	
	var headerThs = domx.th({key: 'uniquekeyTH0'}, '#');
	
	var trs = _
	.chain([1, 2, 3])
	.map(toRow)
	.value();

	var baseKey = 'RoomGridTable';
	var thead = domx.thead({
		key: baseKey + 'thead'
	}, domx.tr(null, headerThs)),
	tbody = domx.tbody({
		key: baseKey + 'tbody'
	}, trs),
	table = domx.table({key: 'uniquekeyTABLE0'}, [thead, tbody]);

	React.render(
		React.createElement(RoomGrid, null),
		document.getElementById('roomGrid')
	);
	/*React.render(
		table, document.getElementById('roomGrid')
	);*/
}