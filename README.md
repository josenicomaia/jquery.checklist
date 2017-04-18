#Simple jQuery Checklist
This plugin just control the strikethrough and state for each checklist item.
There is no predefined HTML or CSS. You should create your own CSS.

![image](https://cloud.githubusercontent.com/assets/1703754/25114691/eddee7a4-23d6-11e7-9edb-00ddecea19b3.png)

## Use
```html
    <div class="checklist">
        <input type="checkbox" />Checklist item 1
    </div>
    <div class="checklist">
        <input type="checkbox" />Checklist item 2
    </div>
    <div class="checklist">
        <input type="checkbox" />Checklist item 3
    </div>

    <script type="text/javascript">
        $(document).ready(function () {
            var checklist = new Checklist();
            checklist.iniciar();
        });
    </script>
```

## Options
List of available options

Example
```javascript
    var checklist = new Checklist({
        historico: {
            ativo: true
        }
    });
    checklist.iniciar();
```

### Defaults
```javascript
    debug: false, // Just print some debug messages
    seletor: '.checklist', // Selector to find each checklist item
    historico: {
        ativo: false, // Saves the checklist state in the LocalStorage. When enabled it will load the previous state.
        prefixoLocalStorage: '' // LocalStorage prefix
    }
```

## Methods
List of available methods

### iniciar()
Just start the plugin.

### limparHistoricoDoPrefixo()
Cleans the checklist state for the current prefix.
