(function Checklist(window, jQuery, undefined) {
    'use strict';

    /**
     * 
     * @constructor
     * @param {object} options
     * @returns {Comparador}
     */
    function Checklist(options) {
        if (typeof options === 'object') {
            var key;

            for (key in options) {
                if (Checklist.prototype.hasOwnProperty(key)) {
                    this[key] = options[key];
                }
            }
        }
    }
    
    Checklist.prototype.debug = false;
    Checklist.prototype.seletor = '.checklist';
    
    Checklist.prototype.historico = {};
    Checklist.prototype.historico.ativo = false;
    Checklist.prototype.historico.prefixoLocalStorage = '';
    
    Checklist.prototype.iniciar = function () {
        var self = this;
        this.log('Iniciando...');
        
        return new Promise(function(resolver, rejeitar) {
            var $itensChecklist = jQuery(self.seletor);
            
            if(self.historico.ativo) {
                self.recarregarItens($itensChecklist);
            }
            
            self.registrarLigamentos($itensChecklist);
            self.log('Iniciado.');
            resolver();
        });
    };
    
    Checklist.prototype.recarregarItens = function ($itensChecklist) {
        var self = this;
        this.log('Recarregando valores...');
        
        $itensChecklist.each(function () {
            var $item = $(this).find('input:checkbox');
            var chave = 'historico_' + self.historico.prefixoLocalStorage + $item.val();
            var valor = localStorage.getItem(chave) == 'true';
            $item.prop('checked', valor);
        });
    };
    
    Checklist.prototype.registrarLigamentos = function ($itensChecklist) {
        var self = this;
        this.log('Registrando ligamentos...');
        
        $itensChecklist.each(function () {
            $(this).find('input:checkbox').on('click', function (event) {
                event.stopPropagation();
            });
            
            $(this).on('click', function () {
                var $checkbox = $(this).find('input:checkbox');
                $checkbox.prop('checked', !$checkbox.prop('checked'));
                $checkbox.change();
            });
            
            $(this).find('input:checkbox').on('change', function () {
                var $item = $(this);
                
                if(self.historico.ativo) {
                    self.salvarItem($item);
                }
                
                if (this.checked) {
                    $item.parent().css('textDecoration', 'line-through');
                } else {
                    $item.parent().css('textDecoration', 'none');
                }
            });
        });
    };
    
    Checklist.prototype.salvarItem = function ($item) {
        this.log('Salvando item...');
        var chave = 'historico_' + this.historico.prefixoLocalStorage + $item.val();
        
        localStorage.setItem(chave, $item.prop('checked'));
    };
    
    Checklist.prototype.limparHistoricoDoPrefixo = function () {
        var self = this;
        
        Object.keys(localStorage)
            .forEach(function (key) {
                if (new RegExp('^historico_' + self.historico.prefixoLocalStorage, 'gi').test(key)) {
                    localStorage.removeItem(key);
                }
            });
    };
    
    Checklist.prototype.log = function () {
        if(this.debug) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('[Checklist]');
            window.console.log.apply(this, args);
        }
    };

    /**
     * Exports
     */
    window.Checklist = Checklist;
})(window, jQuery);
