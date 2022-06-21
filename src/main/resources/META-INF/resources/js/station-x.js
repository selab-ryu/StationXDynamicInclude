let StationX = function ( NAMESPACE, DEFAULT_LANGUAGE, CURRENT_LANGUAGE, AVAILABLE_LANGUAGES ) {

	let MULTI_LANGUAGE = true;
	if( AVAILABLE_LANGUAGES.length < 2 ){
		MULTI_LANGUAGE = false;
	};
	
	const STOP_EVERY = false;
	const CONTINUE_EVERY = true;

	let Util = {
	};
	
	let UIUtil = {
			getMandatorySpan: function(){
				let $span = $('<span>').attr({
					'class': 'reference-mark text-warning'
				});
				let $svg = $('<svg>').attr({
					'class': 'lexicon-icon lexicon-icon-asterisk',
					'focusable': false,
					'role': 'presentation',
					'viewBox': '0 0 512 512'
				});
				$span.append( $svg );
				console.log( '$svg: ', $svg );
				
				$svg.append( $('<path>').attr({
					'd': 'M323.6,190l146.7-48.8L512,263.9l-149.2,47.6l93.6,125.2l-104.9,76.3l-96.1-126.4l-93.6,126.4L56.9,435.3l92.3-123.9L0,263.8l40.4-122.6L188.4,190v-159h135.3L323.6,190L323.6,190z',
					'class': 'lexicon-icon-outline'
				}) )

				console.log( '$span: ', $span );

				return $span;
			},
			getTooltipSpan: function( tooltip ){
				
			}
	};
	
	class DataType {
		static DEFAULT_HAS_DATA_STRUCTURE = false;
		static DEFAULT_SHOW_TOOLTIP = true;
		
		constructor( dataTypeName, dataTypeVersion ){
			this.dataTypeName = dataTypeName;
			this.dataTypeVersion = dataTypeVersion;
			this.hasDataStructure = DataType.DEFAULT_HAS_DATA_STRUCTURE;
			this.showTooltip = DataType.DEFAULT_SHOW_TOOLTIP;
		}
	}
	
	const TermTypes = {
		STRING : 'String',
		NUMERIC : 'Numeric',
		INTEGER : 'Integer',
		BOOLEAN : 'Boolean',
		LIST : 'List',
		LIST_ARRAY : 'ListArray',
		MATRIX : 'Matrix',
		FILE : 'File',
		FILE_ARRAY : 'FileArray',
		OBJECT : 'Object',
		OBJECT_ARRAY : 'ObjectArray',
		ARRAY : 'Array',
		DATA_LINK : 'DataLink',
		DATA_LINK_ARRAY : 'DataLinkArray',
		ADDRESS : 'Address',
		DATE : 'Date',
		PHONE : 'Phone',
		EMAIL : 'EMail',
		GROUP : 'Group',
		COMMENT : 'Comment',
		
		DEFAULT_TERM_TYPE: 'String',


		TERM_TYPES : [ 
				'String',
				'Numeric',
				'Boolean',
				'List',
				'ListArray',
				'Matrix',
				'File',
				'FileArray',
				'Object',
				'ObjectArray',
				'Array',
				'DataLink',
				'DataLinkArray',
				'Address',
				'Date',
				'Phone',
				'EMail',
				'Group',
				'Comment'
			]
	};
	
	const TermAttributes = {
		 ACTIVE : 'active',
		 AVAILABLE_LANGUAGE_IDS : 'availableLanguageIds',
		 COUNTRY_CODE : 'countryCode',
		 DATATYPE_NAME : 'dataTypeName',
		 DATATYPE_VERSION : 'dataTypeVersion',
		 DEFINITION : 'definition',
		 DEFAULT_LANGUAGE_ID : 'defaultLanguageId',
		 DEFAULT_LOCALE : 'defaultLocale',
		 DEPENDENT_TERMS : 'dependentTerms',
		 DIMENSION_X : 'dimensionX',
		 DIMENSION_Y : 'dimensionY',
		 DISABLED : 'disabled',
		 DISPLAY_NAME : 'displayName',
		 DISPLAY_STYLE : 'displayStyle',
		 ELEMENT_TYPE : 'elementType',
		 FILE_ID : 'fileId',
		 FORMAT : 'format',
		 ID : 'id',
		 ITEM_DISPLAY_NAME : 'itemDisplayName',
		 LIST_ITEM : 'listItem',
		 LIST_ITEM_VALUE : 'listItemValue',
		 LIST_ITEMS : 'listItems',
		 MANDATORY : 'mandatory',
		 NAME : 'name',
		 MAX_BOUNDARY : 'maxBoundary',
		 MAX_LENGTH :'maxLength',
		 MAX_VALUE :'maxValue',
		 MIN_BOUNDARY : 'minBoundary',
		 MIN_LENGTH :'minLength',
		 MIN_VALUE :'minValue',
		 MULTIPLE_LINE :'multipleLine',
		 OPTION_LABEL: 'optionLabel',
		 OPTION_VALUE: 'optionValue',
		 OPTION_SELECTED: 'optionSelected',
		 ORDER : 'order',
		 PATH : 'path',
		 PATH_TYPE : 'pathType',
		 PLACE_HOLDER : 'placeHolder',
		 RANGE : 'range',
		 REF_DATATYPES : 'refDataTypes',
		 REF_DATABASES : 'refDatabases',
		 SWEEPABLE : 'sweepable',
		 SYNONYMS : 'synonyms',
		 TERM_NAME : 'termName',
		 TERM_TYPE : 'termType',
		 TERM_VERSION : 'termVersion',
		 TEXT : 'text',
		 TOOLTIP : 'tooltip',
		 UNCERTAINTY : 'uncertainty',
		 UNCERTAINTY_VALUE : 'uncertaintyValue',
		 UNIT : 'unit',
		 URI : 'uri',
		 URI_TYPE : 'uriType',
		 URL : 'url',
		 VALIDATION_RULE  : 'validationRule',
		 VALUE : 'value',
		 VALUE_DELIMITER : 'valueDelimiter',
		 VERSION : 'version'
	};
	
	class LocalizationUtil {
		constructor(){}
		
		static getSelectedLanguage( inputId ){
			if( MULTI_LANGUAGE === false ){
				return CURRENT_LANGUAGE;
			}
			
			let baseId = NAMESPACE + inputId;
			const $languageContainer = $('#'+baseId+'BoundingBox');
			const selectedLanguage = $languageContainer.find('.btn-section').text().replace('-', '_');
			
			return selectedLanguage;
		}

		static getLocalizedXML( fieldName, localizedMap ){
			let xml = 
					'<?xml version=\'1.0\' encoding=\'UTF-8\'?>' +
						'<root ' + 
								'available-locales="' + Object.keys( localizedMap ) + '" ' +
								'default-locale="' + DEFAULT_LANGUAGE + '">';
			Object.keys( localizedMap ).forEach((locale)=>{
				xml += '<' + fieldName + ' language-id="' + locale +'">' + localizedMap[locale] + '</' + fieldName + '>';
			});

			xml += '</root>';

			return xml;
		}
		
		static getLocalizedInputValue( inputId ){
			let baseId = NAMESPACE + inputId;
			const selectedLanguage = LocalizationUtil.getSelectedLanguage( inputId ).trim();
			
			return AVAILABLE_LANGUAGES.reduce( ( obj, locale ) => {
				let localizedInputId = NAMESPACE+inputId+'_'+locale;
				
				if( selectedLanguage === locale && $('#'+baseId).val() ){
					obj[locale] = $('#'+baseId).val();
				}
				else{
					let value = $('#'+localizedInputId).val();
					if( value ){
						obj[locale] = value;
					}
					else{
						delete obj[locale];
					}
				}
				
				return obj;
			}, {} );
		}
		
		static setLocalizedInputValue( inputId, valueMap ){
			const selectedLocale = LocalizationUtil.getSelectedLanguage( inputId ).trim();
			
			if( valueMap ){
				$('#'+NAMESPACE+inputId).val( valueMap[selectedLocale]);
				
				AVAILABLE_LANGUAGES.forEach(function(locale, index){
					let $localizedInput = $('#'+NAMESPACE+inputId+'_'+locale);
					if( $localizedInput ){
						$localizedInput.val( valueMap[locale] );
					}
				});
			}
			else{
				$('#'+NAMESPACE+inputId).val('');
				
				AVAILABLE_LANGUAGES.forEach(function(locale, index){
					let $localizedInput = $('#'+NAMESPACE+inputId+'_'+locale);
					if( $localizedInput ){
						$localizedInput.val( '' );
					}
				});
			}
		}
		
		static clearLocaliedInputValue( inputId ){
			LocalizationUtil.setLocalizedInputValue( inputId );
		}
	}
	
	let FormUIUtil = {
		
		$getTypeSpecificSection: function( termType ){
			return $('#' + NAMESPACE +  termType.toLowerCase() + 'Attributes');
		},
		replaceVisibleTypeSpecificSection: function( termType ){
			$('#'+NAMESPACE+'typeSpecificSection .type-specific-attrs.show').removeClass('show').addClass('hide');

			FormUIUtil.$getTypeSpecificSection( termType ).removeClass('hide').addClass('show');
		},
		getFormRadioValue: function( attrName ){
			return $('input[name="'+NAMESPACE+attrName+'"]:checked').val();
		},
		setFormRadioValue: function( attrName, value ){
			$('input[name="'+NAMESPACE+attrName+'"][value="'+value+'"]' ).prop('checked', true);
		},
		getFormCheckboxValue: function( attrName ){
			let $control = $('#'+NAMESPACE+attrName);
			
			return $control.prop('checked');
		},
		setFormCheckboxValue: function( attrName, value, focus ){
			let $control = $('#'+NAMESPACE+attrName);
			
			if( value ){
				$control.prop( 'checked', value );
			}
			else{
				$control.prop( 'checked', false );
			}
			
			if( focus ){
				$(control).focus();
			}
		},
		getFormCheckedArray: function( attrName ){
			let activeTermNames = $.makeArray( $('input[type="checkbox"][name="'+NAMESPACE+attrName+'"]:checked') )
									.map((checkbox)=>{ return $(checkbox).val();});
			
			return activeTermNames;
		},
		setFormCheckedArray: function( attrName, values ){
			$.makeArray( $( 'input[type="checkbox"][name="'+NAMESPACE+attrName+'"]' ) ).forEach((checkbox)=>{
				if( values && values.includes( $(checkbox).val() ) ){
					console.log('setFormCheckedArray: ', checkbox, values );
					$(checkbox).prop( 'checked', true );
				}
				else{
					console.log('setFormCheckedArray: ', checkbox, values );
					$(checkbox).prop( 'checked', false );
				}
			});
		},
		getFormValue: function( attrName ){
			return $('#'+NAMESPACE+attrName).val();
		},
		setFormValue: function( attrName, value, focus ){
			let $control = $('#'+NAMESPACE+attrName);
			
			if( value ){
				$control.val( value );
			}
			else{
				$control.val( '' );
			}
			
			if( focus ){
				$control.focus();
			}
		},
		clearFormValue: function( attrName ){
			FormUIUtil.setFormValue( attrName );
		},
		getFormLocalizedValue: function( attrName ){
			return LocalizationUtil.getLocalizedInputValue( attrName );
		},
		setFormLocalizedValue: function( attrName, localizedMap, focus ){
			let $control = $('#'+NAMESPACE+attrName);
			
			if( localizedMap ){
				LocalizationUtil.setLocalizedInputValue( attrName, localizedMap );
			}
			else{
				LocalizationUtil.setLocalizedInputValue( attrName );
			}
			
			if( focus ){
				$control.focus();
			}
		},
		$getRenderedFormControl: function( renderUrl, params ){
			return new Promise( function(resolve, reject){
				$.ajax({
					url: renderUrl,
					method: 'post',
					dataType: 'html',
					data: params,
					success: function( response ){
						resolve( $(response) );
					},
					error: function( xhr ){
						reject( xhr);
					}
				});
			});
		},
		disableControls: function(controlIds, disable ){
			controlIds.forEach((controlId)=>{
				$('#'+NAMESPACE+controlId).prop('disabled', disable);
			})
		}
	};
	
	const SXIcecapEvents = {
		DATATYPE_PREVIEW_TERM_DELETED: 'DATATYPE_PREVIEW_TERM_DELETED',
		DATATYPE_PREVIEW_TERM_SELECTED: 'DATATYPE_PREVIEW_TERM_SELECTED',
		DATATYPE_FORM_UI_SHOW_TERMS: 'DATATYPE_FORM_UI_SHOW_TERMS',
		DATATYPE_ACTIVE_TERM_CHANGED: 'DATATYPE_ACTIVE_TERM_CHANGED',
		LIST_OPTION_ACTIVE_TERM_DELETED: 'LIST_OPTION_ACTIVE_TERM_REMOVED',
		LIST_OPTION_ACTIVE_TERM_SELECTED: 'LIST_OPTION_ACTIVE_TERM_SELECTED',
		LIST_OPTION_PREVIEW_REMOVED: 'LIST_OPTION_PREVIEW_REMOVED',
		LIST_OPTION_PREVIEW_SELECTED: 'LIST_OPTION_PREVIEW_SELECTED',
		LIST_OPTION_ACTIVE_TERMS_CHANGED:'LIST_OPTION_ACTIVE_TERMS_CHANGED'
	};

	const SXConstants = {
		FOR_PREVIEW: true,
		FOR_EDITOR: false,

		DISPLAY_STYLE_SELECT: 'select',
		DISPLAY_STYLE_RADIO: 'radio',
		DISPLAY_STYLE_CHECK: 'check'
	}
	
	class LocalizedObject {
		constructor( localizedMap  ){
			if( localizedMap ){
				this.localizedMap = localizedMap;
			}
			else{
				this.localizedMap = {};
			}
		}
		
		isEmpty(){
			return Object.keys( this.localizedMap ).length ? false : true;
		}
		
		getLocalizedMap(){
			return this.localizedMap;
		}
		
		setLocalizedMap( map ){
			if( Object.keys( map ).length <= 0 ){
				if( this.localizedMap ){
					delete this.localizedMap;
				}
			}
			else{
				this.localizedMap = map;
			}
		}
		
		getText( locale ){
			return this.localizedMap[locale] ? this.localizedMap[locale] : this.localizedMap[DEFAULT_LANGUAGE];
		}
		
		addText( locale, text, force ){
			this.localizedMap[locale] = text;
		}
		
		updateText( locale, text ){
			this.localizedMap[locale] = text;
		}
		
		removeText( locale ){
			delete this.localizedMap[locale];
		}
		
		
		
		toXML(){
			
		}
		
		toJSON(){
			return this.localizedMap;
		}
		
		parseXML( xml ){
			
		}
		
		parse( jsonContent ){
			let content = jsonContent;
			if( typeof jsonContent === 'string' ){
				content = JSON.parse( jsonContent );
			}
			
			for( key in content ){
				this.localizedMap[key] = content[key];
			}
		}
	}

	class ListOption{
		constructor( optionLabelMap, optionValue, selected, activeTerms ){
			this.value = optionValue;
			this.labelMap = optionLabelMap;
			this.activeTerms = activeTerms;
			this.selected = selected;
			this.editing = false;
		}

		getLabelMap(){
			return this.labelMap;
		}

		setLabelMap( map ){
			this.labelMap = map;
		}

		addActiveTerm( term ){
			this.activeTerms.push( term );
		}

		removeActiveTerm( termName ){
			this.activeTerms = this.activeTerms.filter(( term ) => {
				return !(term.termName === termName);
			});
		}

		$renderPreview(){
			let html = '<tr>' +
							'<td class="option-label" style="width:50%;">' + this.labelMap[CURRENT_LANGUAGE] + '</td>' +
							'<td class="option-value" style="width:30%;">' + this.value + '</td>' +
							'<td class="option-selected" style="width:10%;">';
			if( this.selected ){
				html += '&#10004;';
			}
			html += '</td>';
			html += '<td>' +
						'<button type="button" class="btn btn-default">' +
							'<i class="icon-remove" />' +
						'</button>' +
					'</td> </tr>';
			
			let $row = $( html );
			
			let self = this;
			$row.find('button').click(function(event){
				event.stopPropagation();

				let eventData = {
					sourcePortlet: NAMESPACE,
					targetPortlet: NAMESPACE,
					removedOption: self
				};

				Liferay.fire( SXIcecapEvents.LIST_OPTION_PREVIEW_REMOVED, eventData );
			});

			$row.click(function(event){
				event.stopPropagation();

				let eventData = {
					sourcePortlet: NAMESPACE,
					targetPortlet: NAMESPACE,
					highlightedOption: self
				};

				Liferay.fire( SXIcecapEvents.LIST_OPTION_PREVIEW_SELECTED, eventData );
			});

			return $row;
		}

		renderActiveTermsPreview( $previewPanel ){
			$previewPanel.empty();

			this.activeTerms.every( (term, index, ary) =>{
				let $row = $( '<tr>' +
						'<td style="width:35%;">' +
							term.termName +
						'</td>' +
						'<td style="width:20%;">' +
							term.termType +
						'</td>' +
						'<td style="width:35%;">' +
							term.displayName.getText(CURRENT_LANGUAGE) +
						'</td>' +
						'<td>' +
							'<button type="button" class="btn btn-default">' +
								'<i class="icon-remove" />' +
							'</button>' +
						'</td>' +
					'</tr>' );

				let self = this;
				$row.find('button').click(function(event){
					event.stopPropagation();

					self.removeActiveTerm( term.termName );

					$row.remove();

					let eventData = {
						sourcePortlet: NAMESPACE,
						targetPortlet: NAMESPACE,
						deletedTerm: term
					}

					Liferay.fire( SXIcecapEvents.LIST_OPTION_ACTIVE_TERM_REMOVED, eventData );
				});

				$row.click(function(event){
					event.stopPropagation(); 
					
					$previewPanel.find('.highlight-border').removeClass('highlight-border');
					$row.addClass('highlight-border');
					
					let eventData = {
						sourcePortlet: NAMESPACE,
						targetPortlet: NAMESPACE,
						selectedTerm: term
					}

					Liferay.fire( SXIcecapEvents.LIST_OPTION_ACTIVE_TERM_SELECTED, eventData );
				});
				
				$previewPanel.append( $row );
			});
		}

		toJSON(){
			return {
				value: this.value,
				label: this.labelMap,
				selected: this.selected ? this.selected : false,
				activeTerms: JSON.stringify(this.activeTerms)
			};
		}
	}

	class Term {
		static DEFAULT_TERM_ID = 0;
		static DEFAULT_TERM_VERSION = '1.0.0';
		static DEFAULT_MANDATORY = false;
		static DEFAULT_MIN_LENGTH = 1;
		static VALID_NAME_PATTERN=/^[_a-zA-Z]([_a-zA-Z0-9])*$/;
		static STATE_INIT = -1;
		static STATE_PREVIEWED = 0;
		static STATE_DIRTY = 2;
		static STATE_ACTIVE = 3;
		static STATE_INACTIVE = 4;
		static STATUS_ANY = -1;
		static STATUS_APPROVED = 0;
		static STATUS_PENDING = 1;
		static STATUS_DRAFT = 2;
		static STATUS_EXPIRED = 3;
		static STATUS_DENIED = 4;
		static STATUS_INACTIVE = 5;
		static STATUS_INCOMPLETE = 6;
		static STATUS_SCHEDULED = 7;
		static STATUS_IN_TRASH = 8;

		static validateTermVersion( updated, previous ){
			let updatedParts = updated.split('.');
			console.log( 'updatedParts: ', updatedParts);
			
			let validationPassed = true;
			
			// Check valid format
			if( updatedParts.length !== 3 )		return false;
			
			updatedParts.every((part)=>{
				
				let int = Number(part); 
				
				if( Number.isInteger(int) ){
					return CONTINUE_EVERY;
				}
				else{
					validationPassed = STOP_EVERY;
					return STOP_EVERY;
				}
			});
			
			if( !validationPassed )		return false;
			
			// updated version should be bigger than previous versison
			if( previous ){
				console.log( 'Previous: '+previous);
				
				let previousParts = previous.split('.');
				
				if( Number(updatedParts[0]) < Number(previousParts[0]) ){
					console.log('0: ', Number(updatedParts[0]), Number(previousParts[0]));
					validationPassed = false;
				}
				else if( Number(updatedParts[1]) < Number(previousParts[1]) ){
					console.log('1: ', Number(updatedParts[1]), Number(previousParts[1]));
					validationPassed = false;
				}
				else if( Number(updatedParts[2]) <= Number(previousParts[2]) ){
					console.log('2: ', Number(updatedParts[2]), Number(previousParts[2]));
					validationPassed = false;
				}
			}
			
			return validationPassed;
		}

		
		constructor( termType ){
			this.termId = 0;
			this.initAllAttributes( termType );
		}

		getLocalizedDisplayName(){
			if( !this.displayName || this.displayName.isEmpty() ){
				return '';
			}
			else{
				return this.displayName.getText(CURRENT_LANGUAGE);
			}
		}

		getLocalizedDefinition(){
			if( !this.definition || this.definition.isEmpty() ){
				return '';
			}
			else{
				return this.definition.getText(CURRENT_LANGUAGE);
			}
		}

		getLocalizedTooltip(){
			if( !this.tooltip || this.tooltip.isEmpty() ){
				return false;
			}
			else{
				const tooltip = this.tooltip.getText(CURRENT_LANGUAGE);
				return tooltip ? tooltip : this.tooltip.getText(DEFAULT_LANGUAGE);
			}
		}

		addSynonym( synonym ){
			if( !this.synonyms )
				this.sysnonyms = new Array();
			this.synonyms.push( synonym );
		}
		
		removeSynonym( synonym ){
			if( !this.synonyms )		return;
			
			this.synonyms.every( (item, index, arr ) => {
				if( item === synonym ){
					this.synonyms.splice( index, 1 );
					return STOP_EVERY;
				}
				
				return CONTINUE_EVERY;
			});
		}
		
		addDependentTerm( termName ){
			if( !this.dependentTerms ){
				this.dependentTerms = new Array();
			}
			this.dependentTerms.push( termName );
		}
		
		removeDependentTerm( termName ){
			if( !this.dependentTerms )	return;
			
			this.dependentTerms.every( (item, index, arr ) => {
				if( item === termName ){
					this.dependentTerms.splice( index, 1 );
					return STOP_EVERY;
				}
				return CONTINUE_EVERY;
			});
		}
		
		addActiveTerm( termName ){
			if( !this.activeTerms ){
				this.activeTerms = new Array();
			}
			this.activeTerms.push( termName );
		}
		
		removeActiveTerm( termName ){
			if( !this.activeTerms )	return;
			
			this.activeTerms.every( (item, index, arr ) => {
				if( item === termName ){
					this.activeTerms.splice( index, 1 );
					return STOP_EVERY;
				}
				return CONTINUE_EVERY;
			});
		}
		
		/**
		 *  Validate the term name matches naming pattern.
		 *  If it is needed to change naming pattern, 
		 *  change VALID_NAME_PATTERN static value.
		 *  
		 *   @return
		 *   		true,		if matched
		 *   		false,		when not matched
		 */
		validateNameExpression( name ){
			if( name ){
				return Term.VALID_NAME_PATTERN.test( name );
			}
			else{
				return Term.VALID_NAME_PATTERN.test(this.termName);
			}
		}
		
		validateMandatoryFields(){
			if( !this.termName )	return 'termName';
			if( !this.termVersion )	return 'termVersion';
			if( !this.displayName || this.displayName.isEmpty() )	return 'displayName';
			
			return true;
		}
		
		validate(){
			let result = this.validateMandatoryFields();
			if( result !== true ){
				alert( result + ' should be not empty.' );
				$('#'+NAMESPACE+result).focus();
				
				return false;
			}
			
			if( this.validateNameExpression() === false ){
				alert( 'Invalid term name. Please try another one.' );
				$('#'+NAMESPACE+result).focus();
				return false;
			}
			
			return true;
		}
		
		toJSON(){
			let json = {};
			
			json.termType = this.termType;
			if( this.termName )		json.termName = this.termName;	
			if( this.termVersion && this.termVersion !== Term.DEFAULT_TERM_VERSION )	json.termVersion = this.termVersion;
			if( this.displayName && !this.displayName.isEmpty() ) json.displayName = this.displayName.getLocalizedMap();
			if( this.definition && !this.definition.isEmpty() ) json.definition = this.definition.getLocalizedMap();
			if( this.tooltip && !this.tooltip.isEmpty() ) json.tooltip = this.tooltip.getLocalizedMap();
			if( this.synonyms && this.synonyms.length > 0 ) json.synonyms = this.synonyms;
			if( this.mandatory )		json.mandatory = this.mandatory;
			if( this.value || this.value === 0 )	json.value = this.value;
			if( this.order || this.order === 0 )	json.order = this.order;
			if( this.dependentTerms && this.dependentTerms.length > 0 ) json.dependentTerms = this.dependentTerms;
			if( this.activeTerms && this.activeTerms.length > 0 ) json.activeTerms = this.activeTerms;
			
			json.status = this.status;
			json.state = this.state;
			
			return json;
		}
		
		parse( json ){
			let unparsed = {};
			
			Objet.keys( content ).forEach(function(key, index){
				switch( key ){
					case 'termType':
					case 'termName':
					case 'termVersion':
					case 'synonyms':
					case 'mandatory':
					case 'value':
					case 'active':
					case 'order':
					case 'state':
						this[key] = json[key];
						break;
					case 'displayName':
					case 'definition':
					case 'tooltip':
						this[key] = new LocalizedObject(); 
						this[key].setLocalizedMap( json[key] );
						break;
					default:
						unparsed[key] = json[key];
				}
			});
			
			return unparsed;
		}
		
		/****************************************************************
		 * Setter and getter UIs for form control values of the definer's edit section.
		 * Form controls should be consist of [namespace]+[term attribute name]
		 ****************************************************************/
		getTermTypeFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.TERM_TYPE );
			if( save ){
				this.termType = value;
			}
			
			return value;
		}
		setTermTypeFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.TERM_TYPE, value );
			}
			else if( this.termType ){
				FormUIUtil.setFormValue( TermAttributes.TERM_TYPE, this.termType );
			}
			else{
				FormUIUtil.setFormValue( TermAttributes.TERM_TYPE, TermTypes.STRING );
			}
		}
		
		getTermNameFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.TERM_NAME );
			if( save ){
				this.termName = value;
			}
			
			return value;
		}
		setTermNameFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.TERM_NAME, value );
			}
			else if( this.termName ){
				FormUIUtil.setFormValue( TermAttributes.TERM_NAME, this.termName );
			}
			else{
				FormUIUtil.setFormValue( TermAttributes.TERM_NAME, '' );
			}
		}
		
		getTermVersionFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.TERM_VERSION );
			if( save ){
				this.termVersion = value;
			}
			
			return value;
		}
		setTermVersionFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.TERM_VERSION, value );
			}
			else if( this.termVersion ){
				FormUIUtil.setFormValue( TermAttributes.TERM_VERSION, this.termVersion );
			}
			else{
				FormUIUtil.setFormValue( TermAttributes.TERM_VERSION, Term.DEFAULT_TERM_VERSION );
			}
		}
		
		getDisplayNameFormValue ( save ){
			let valueMap = FormUIUtil.getFormLocalizedValue( 'termDisplayName' );
			if( save ){
				this.displayName = new LocalizedObject();
				this.displayName.setLocalizedMap( valueMap );
			}
			
			return valueMap;
		}
		setDisplayNameFormValue ( valueMap ){
			if( valueMap ){ 
				FormUIUtil.setFormLocalizedValue( 'termDisplayName', valueMap );
			}
			else if( this.displayName ){
				FormUIUtil.setFormLocalizedValue( 'termDisplayName', this.displayName.getLocalizedMap() );
			}
			else{
				FormUIUtil.setFormLocalizedValue( 'termDisplayName' );
			}
		}
		
		getDefinitionFormValue ( save ){
			let valueMap = FormUIUtil.getFormLocalizedValue( 'termDefinition' );
			if( save ){
				this.definition = new LocalizedObject();
				this.definition.setLocalizedMap( valueMap );
			}
			
			return valueMap;
		}
		setDefinitionFormValue ( valueMap ){
			if( valueMap ){
				FormUIUtil.setFormLocalizedValue( 'termDefinition', valueMap );
			}
			else if( this.definition ){
				FormUIUtil.setFormLocalizedValue( 'termDefinition', this.definition.getLocalizedMap() );
			}
			else{
				FormUIUtil.setFormLocalizedValue( 'termDefinition' );
			}
		}

		getTooltipFormValue ( save ){
			let valueMap = FormUIUtil.getFormLocalizedValue( 'termTooltip' );

			if( save ){
				if( Object.keys( valueMap ).length <= 0 && this.tooltip ){
					this.tooltip = null;
				}
				else{
					this.tooltip = new LocalizedObject();
					this.tooltip.setLocalizedMap( valueMap );
				}
			}
			
			return valueMap;
		}
		setTooltipFormValue ( valueMap ){
			if( valueMap ){
				FormUIUtil.setFormLocalizedValue( 'termTooltip', valueMap );
			}
			else if( this.tooltip ){
				FormUIUtil.setFormLocalizedValue( 'termTooltip', this.tooltip.getLocalizedMap() );
			}
			else{
				FormUIUtil.setFormLocalizedValue( 'termTooltip' );
			}
		}
		
		getSynonymsFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.SYNONYMS );
			if( save ){
				this.synonyms = value;
			}
			
			return value;
		}
		setSynonymsFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.SYNONYMS, value );
			}
			else if( this.synonyms ){
				FormUIUtil.setFormValue( TermAttributes.SYNONYMS, this.synonyms );
			}
			else{
				FormUIUtil.clearFormValue( TermAttributes.SYNONYMS );
			}
		}

		getMandatoryFormValue ( save ){
			let value = FormUIUtil.getFormCheckboxValue( TermAttributes.MANDATORY );
			
			if( save ){
				this.mandatory = value;
			}
			
			return value;
		}
		setMandatoryFormValue ( value ){
			if( value ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.MANDATORY, value );
			}
			else if( this.mandatory ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.MANDATORY, this.mandatory );
			}
			else{
				FormUIUtil.setFormCheckboxValue( TermAttributes.MANDATORY, Term.DEFAULT_MANDATORY );
			}
		}
		
		getValueFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.VALUE );
			if( save ){
				this.value = value;
			}
			
			return value;
		}
		setValueFormValue ( value ){
			if( value || value === 0 ){
				FormUIUtil.setFormValue( TermAttributes.VALUE, value );
			}
			else if( this.value || this.value === 0 ){
				FormUIUtil.setFormValue( TermAttributes.VALUE, this.value );
			}
			else{
				FormUIUtil.clearFormValue( TermAttributes.VALUE );
			}
		}
		

		setAllFormValues(){
			this.setTermTypeFormValue();
			this.setTermNameFormValue();
			this.setTermVersionFormValue();
			this.setDisplayNameFormValue();
			this.setDefinitionFormValue();
			this.setTooltipFormValue();
			this.setSynonymsFormValue();
			this.setMandatoryFormValue();
			this.setValueFormValue();
		}

		initAllAttributes( termType ){
			if( termType ){
				this.termType = termType;
			}
			else{
				this.termType = 'Sting';
			}
				
			this.termName = '';
			this.termVersion = Term.DEFAULT_TERM_VERSION;
			this.displayName = null;
			this.definition = null;
			this.tooltip = null;
			this.synonyms = null;
			this.mandatory = Term.DEFAULT_MANDATORY;
			this.value = null;
			this.dependentTerms = null;
			this.activeTerms = null;
			this.status = Term.STATUS_DRAFT;
			this.state = Term.STATE_INIT;
		}
		
	} // End of Term
	
	/* 1. String */
	class StringTerm extends Term {
		static DEFAULT_MIN_LENGTH = 1;
		static DEFAULT_MAX_LENGTH = 72;
		static DEFAULT_MULTIPLE_LINE = false;
		static DEFAULT_VALIDATION_RULE = "^[\w\s!@#\$%\^\&*\)\(+=._-]*$"
		
		constructor(){
			super( 'String' );
			
			this.initAllAttributes();
			
			this.setAllFormValues();
		}
		
		removeActiveTerm( termName ){
			return null;
		} 

		setLocalizedMap ( attrName, controlId ){
			
			defaultLocales.forEach( function( locale ) {
				let localizedInputId = NAMESPACE+id+'_'+locale;
				
				this.localizedMap[locale] = $('#localizedInputId').val();
			});
			
			return this.localizedMap;
		}
		
		
		toJSON(){
			let json = super.toJSON();
			
			if( this.placeHolder )
				json.placeHolder = this.placeHolder.getLocalizedMap();
			if( this.minLength > StringTerm.DEFAULT_MIN_LENGTH )		
				json.minLength = this.minLength;
			if( this.maxLength !== StringTerm.DEFAULT_MAX_LENGTH )		
				json.maxLength = this.maxLength;
			if( this.multipleLine !== StringTerm.DEFAULT_MULTIPLE_LINE)	
				json.multipleLine = this.multipleLine;
			if( this.validationRule !== StringTerm.DEFAULT_VALIDATION_RULE )
				json.validationRule = this.validationRule;
			
			return json;
		}
		
		parse( json ){
			let unparsed = super.parse( json );
			let unvalid = {};
			
			Object.keys( unparsed ).forEach( (key, index) => {
				switch( key ){
					case 'minLength':
					case 'maxLength':
					case 'multipleLine':
					case 'validationRule':
						this[key] = unparsed[key];
						break;
					case 'placeHolder':
						this.placeHolder = new LocalizedObject( unparsed[key] );
						break;
					default:
						console.log('Un-identified Attribute: '+key);
						unvalid[key] = unparsed[key];
				}
			});
			
			return unvalid;
		}
		
		/**
		 * Render term UI for preview
		 */
		$render( renderInputUrl, forWhat ){
			let params = Liferay.Util.ns(NAMESPACE, {
				controlType: 'string',
				renderType: forWhat ? forWhat : false,
				controlName: NAMESPACE+this.termName,
				label: this.getLocalizedDisplayName(),
				required: this.mandatory ? this.mandatory : false,
				inputType: this.multipleLine ? 'textarea' : 'text',
				placeHolder: this.getLocalizedPlaceHolder() ? this.getLocalizedPlaceHolder() : '',
				value: this.value ? this.value : '',
				helpMessage: this.getLocalizedTooltip() ? this.getLocalizedTooltip() : ''
			});

			return FormUIUtil.$getRenderedFormControl( renderInputUrl, params );
		}

		renderEditControl(){
			return null;
		}

		getLocalizedPlaceHolder(){
			if( !this.placeHolder || this.placeHolder.isEmpty() ){
				return false;
			}
			else{
				const placeHolder = this.placeHolder.getText(CURRENT_LANGUAGE);
				return placeHolder ? placeHolder : this.placeHolder.getText(DEFAULT_LANGUAGE);
			}
		}

		getPlaceHolderFormValue ( save ){
			let valueMap = FormUIUtil.getFormLocalizedValue( TermAttributes.PLACE_HOLDER );

			if( save ){
				if( Object.keys( valueMap ).length <= 0 ){
					this.placeHolder = null;
				}
				else{
					this.placeHolder = new LocalizedObject();
					this.placeHolder.setLocalizedMap( valueMap );
				}
			}
			
			return valueMap;
		}
		setPlaceHolderFormValue ( valueMap ){
			if( valueMap ){
				FormUIUtil.setFormLocalizedValue( TermAttributes.PLACE_HOLDER, valueMap );
			}
			else if( this.placeHolder ){
				FormUIUtil.setFormLocalizedValue( TermAttributes.PLACE_HOLDER, this.placeHolder.getLocalizedMap() );
			}
			else{
				FormUIUtil.setFormLocalizedValue( TermAttributes.PLACE_HOLDER );
			}
		}

		getMinLengthFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.MIN_LENGTH );
			if( save ){
				this.minLength = value;
			}
			
			return value;
		}
		setMinLengthFormValue ( value ){
			if( value && value > 0 ){
				FormUIUtil.setFormValue( TermAttributes.MIN_LENGTH, value );
			}
			else if( this.minLength ){
				FormUIUtil.setFormValue( TermAttributes.MIN_LENGTH, this.minLength );
			}
			else{
				FormUIUtil.setFormValue( TermAttributes.MIN_LENGTH, 1 );
			}
		}
		
		getMaxLengthFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.MAX_LENGTH );
			if( save ){
				this.maxLength = value;
			}
			
			return value;
		}
		setMaxLengthFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.MAX_LENGTH, value );
			}
			else if( this.maxLength ){
				FormUIUtil.setFormValue( TermAttributes.MAX_LENGTH, this.maxLength );
			}
			else{
				FormUIUtil.clearFormValue( TermAttributes.MAX_LENGTH );
			}
		}
		
		getMultipleLineFormValue ( save ){
			let value = FormUIUtil.getFormCheckboxValue( TermAttributes.MULTIPLE_LINE );
			if( save ){
				this.multipleLine = value;
			}
			
			return value;
		}
		setMultipleLineFormValue ( value ){
			if( value ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.MULTIPLE_LINE, value );
			}
			else if( this.multipleLine ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.MULTIPLE_LINE, this.multipleLine );
			}
			else{
				FormUIUtil.setFormCheckboxValue( TermAttributes.MULTIPLE_LINE, StringTerm.DEFAULT_MULTIPLE_LINE );
			}
		}
		
		getValidationRuleFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.VALIDATION_RULE );
			if( save ){
				this.validationRule = value;
			}
			
			return value;
		}
		setValidationRuleFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.VALIDATION_RULE, value );
			}
			else if( this.validationRule ){
				FormUIUtil.setFormValue( TermAttributes.VALIDATION_RULE, this.validationRule );
			}
			else{
				FormUIUtil.clearFormValue( TermAttributes.VALIDATION_RULE );
			}
		}
		
		setAllFormValues(){
			super.setAllFormValues();
			
			this.setMinLengthFormValue();
			this.setMaxLengthFormValue();
			this.setMultipleLineFormValue();
			this.setValidationRuleFormValue();
		}

		initAllAttributes(){
			super.initAllAttributes( 'String' ); 
			this.minLength = StringTerm.DEFAULT_MIN_LENGTH;
			this.maxLength = StringTerm.DEFAULT_MAX_LENGTH;
			this.multipleLine = StringTerm.DEFAULT_MULTIPLE_LINE;
			this.validationRule = StringTerm.DEFAULT_VALIDATION_RULE;
			this.placeHolder = null;
		}
		
		validation(){
			
		}
	}
	
	/* 2. NumericTerm */
	class NumericTerm extends Term{
		constructor(){
			super('Numeric');
			
			this.initAllAttributes();
			
			this.setAllFormValues();
		}

		removeActiveTerm( termName ){
			return null;
		} 
		
		$render( renderInputUrl, forWhat ){
			let params = Liferay.Util.ns(NAMESPACE, {
					controlType: 'numeric',
					renderType: forWhat ? forWhat : false,
					controlName: NAMESPACE+this.termName,
					label: this.displayName.getText(CURRENT_LANGUAGE),
					required: this.mandatory ? this.mandatory : false,
					value: this.value ? this.value : '',
					helpMessage: this.getLocalizedTooltip() ? this.getLocalizedTooltip() : '',
					minValue: this.minValue ? this.minValue : '',
					minBoundary: this.minBoundary ? this.minBoundary : false,
					maxValue: this.maxValue ? this.maxValue : '',
					maxBoundary: this.maxBoundary ? this.maxBoundary : false,
					unit: this.unit?this.unit : '',
					uncertainty: this.uncertainty ? this.uncertainty : false,
					uncertaintyValue: this.uncertaintyValue ? this.uncertaintyValue : ''
			});

			return FormUIUtil.$getRenderedFormControl( renderInputUrl, params );
		}

		getMinValueFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.MIN_VALUE );
			if( save ){
				this.minValue = value;
			}
			
			return value;
		}
		setMinValueFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.MIN_VALUE, value );
			}
			else if( this.minValue ){
				FormUIUtil.setFormValue( TermAttributes.MIN_VALUE, this.minValue );
			}
			else{
				FormUIUtil.clearFormValue( TermAttributes.MIN_VALUE );
			}
		}
		
		getMinBoundaryFormValue ( save ){
			let value = FormUIUtil.getFormCheckboxValue( TermAttributes.MIN_BOUNDARY );
			if( save ){
				this.minBoundary = value;
			}
			
			return value;
		}
		setMinBoundaryFormValue ( value ){
			if( value ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.MIN_BOUNDARY, value );
			}
			else if( this.minBoundary ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.MIN_BOUNDARY, this.minBoundary );
			}
			else{
				FormUIUtil.setFormCheckboxValue( TermAttributes.MIN_BOUNDARY );
			}
		}
		
		getMaxValueFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.MAX_VALUE );
			if( save ){
				this.maxValue = value;
			}
			
			return value;
		}
		setMaxValueFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.MAX_VALUE, value );
			}
			else if( this.maxValue ){
				FormUIUtil.setFormValue( TermAttributes.MAX_VALUE, this.maxValue );
			}
			else{
				FormUIUtil.clearFormValue( TermAttributes.MAX_VALUE );
			}
		}
		
		getMaxBoundaryFormValue ( save ){
			let value = FormUIUtil.getFormCheckboxValue( TermAttributes.MAX_BOUNDARY );
			if( save ){
				this.maxBoundary = value;
			}
			
			return value;
		}
		setMaxBoundaryFormValue ( value ){
			if( value ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.MAX_BOUNDARY, value );
			}
			else if( this.maxBoundary ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.MAX_BOUNDARY, this.maxBoundary );
			}
			else{
				FormUIUtil.setFormCheckboxValue( TermAttributes.MAX_BOUNDARY );
			}
		}
		
		getUnitFormValue ( save ){
			let value = FormUIUtil.getFormValue( TermAttributes.UNIT );
			if( save ){
				this.unit = value;
			}
			
			return value;
		}
		setUnitFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( TermAttributes.UNIT, value );
			}
			else if( this.unit ){
				FormUIUtil.setFormValue( TermAttributes.UNIT, this.unit );
			}
			else{
				FormUIUtil.clearFormValue( TermAttributes.UNIT );
			}
		}
		
		getUncertaintyFormValue ( save ){
			let value = FormUIUtil.getFormCheckboxValue( TermAttributes.UNCERTAINTY );
			if( save ){
				this.uncertainty = value;
			}
			
			return value;
		}
		setUncertaintyFormValue ( value ){
			if( value ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.UNCERTAINTY, value );
			}
			else if( this.uncertainty ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.UNCERTAINTY, this.uncertainty );
			}
			else{
				FormUIUtil.setFormCheckboxValue( TermAttributes.UNCERTAINTY );
			}
		}

		getSweepableFormValue ( save ){
			let value = FormUIUtil.getFormCheckboxValue( TermAttributes.SWEEPABLE );
			if( save ){
				this.sweepable = value;
			}
			
			return value;
		}
		setSweepableFormValue ( value ){
			if( value ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.SWEEPABLE, value );
			}
			else if( this.sweepable ){
				FormUIUtil.setFormCheckboxValue( TermAttributes.SWEEPABLE, this.sweepable );
			}
			else{
				FormUIUtil.setFormCheckboxValue( TermAttributes.SWEEPABLE );
			}
		}
		
		setAllFormValues(){
			super.setAllFormValues();
			this.setMinValueFormValue();
			this.setMinBoundaryFormValue();
			this.setMaxValueFormValue();
			this.setMaxBoundaryFormValue();
			this.setUnitFormValue();
			this.setUncertaintyFormValue();
			this.setSweepableFormValue();
		}

		initAllAttributes(){
			super.initAllAttributes( 'Numeric' );

			this.minValue = null;
			this.minBoundary = false;
			this.maxValue = null;
			this.maxBoundary = false;
			this.unit = null;
			this.uncertainty = false;
			this.sweepable = false;
		}
		
		parse( json ){
			
		}
		
		toJSON(){
			let json = super.toJSON();
			
			if( this.minValue )	json.minLength = this.minLength;
			if( this.maxLength )	json.maxLength = this.maxLength;
			if( this.multipleLine )	json.multipleLine = this.multipleLine;
			if( this.validationRule )	json.validationRule = this.validationRule;
			
			return json;

		}

	}
	
	/* 3. ListTerm */
	class ListTerm extends Term {
		static $DISPLAY_STYLE_FORM_CONTROL = $('#'+NAMESPACE+'listDisplayStyle');
		static $OPTION_TABLE = $('#'+NAMESPACE+'options');
		static $OPTION_LABEL = $('#'+NAMESPACE+'optionLabel');
		static $OPTION_VALUE = $('#'+NAMESPACE+'optionValue');
		static $OPTION_SELECTED = $('#'+NAMESPACE+'optionSelected');
		static $OPTION_ACTIVE_TERMS = $('#'+NAMESPACE+'activeTerms');
		static $BTN_ADD_OPTION = $('#'+NAMESPACE+'btnAddOption');
		static $BTN_NEW_OPTION = $('#'+NAMESPACE+'btnNewOption');
		static AVAILABLE_TERMS = null;

		constructor(){
			super('List');

			this.initAllAttributes();

			this.initOptionFormValues( null );

			if( ListTerm.AVAILABLE_TERMS ){
				this.constructOptionActiveTermsSelector();
			}
		}

		highlightOptionPreview(){
			let rows = $.makeArray( ListTerm.$OPTION_TABLE.children('tr') );
			rows.forEach((row, index) => { 
				$(row).removeClass( 'highlight-border' );
				if( this.highlightedOption && this.highlightedOption === this.options[index] ){
					$(row).addClass( 'highlight-border' );
				}
			});
		}

		/**********************************************************
		 * 1. Read all values from Form
		 * 2. Create ListOption instancec with the values
		 * 3. Push the instance at the options array
		 * 4. Render a preview row of the instance and add to the preview table
		 * 5. 
		 */
		addOption(){
			let optionLabelMap = this.getOptionLabelFormValue();
			let optionValue = this.getOptionValueFormValue();
			let selected = this.getOptionSelectedFormValue();
			if( selected === true ){
				this.clearSelectedOption();
			}

			let activeTerms = this.getActiveTermsFormValue();

			let option = new ListOption( optionLabelMap, optionValue, selected, activeTerms );

			this.options.push(option);

			let $row = option.$renderPreview();

			ListTerm.$OPTION_TABLE.append( $row ); 

			this.highlightedOption = option;

			this.highlightOptionPreview();
		}

		updateDependentTerms(){
			if( !this.options )	return;
			this.dependentTerms = new Array();

			this.options.forEach((option)=>{
				if( option.activeTerms ){
					option.activeTerms.forEach((termName)=>{
						if( !this.dependentTerms.includes( termName ) ){
							this.dependentTerms.push(termName);
						}
					});
				}
			});
		}

		clearSelectedOption(){
			this.options.forEach((option, index)=>{
				if( option !== this.highlightedOption ){
					option.selected = false;
					ListTerm.$OPTION_TABLE.find('tr:nth-child('+(index+1)+') td.option-selected').empty();
				}
			});
		}

		removeOption( optionValue ){
			this.options = this.options.filter(
				(option, index, ary) => { 
					if( option.value === optionValue ){
						ListTerm.$OPTION_TABLE.find('tr:nth-child('+(index+1)+')').remove();

						let newIndex = index;
						this.highlightedOption = null;
						if( index === (ary.length - 1) ){
							newIndex = ary.length - 2;
						}
						else{
							newIndex = index + 1;
						}
						
						if( newIndex >= 0 ){
							this.highlightedOption = this.options[newIndex];
							console.log('selected: ', this.highlightedOption );
						}

						return false;
					}

					return true;
				});
			
			this.initOptionFormValues(this.highlightedOption);

			if( this.options.length === 0 ){
				ListTerm.$BTN_ADD_OPTION.prop('disabled', false );
			}

			console.log( 'Options after '+optionValue+' removed: ', this.options );
		}

		setOptionLabelMap( labelMap ){
			if( this.highlightedOption ){
				this.highlightedOption.setLabelMap( labelMap );
				this.refreshOptionPreview( 'label' );
			}
		}

		setOptionValue( value ){
			if( this.highlightedOption ){
				this.highlightedOption.value = value;
				this.refreshOptionPreview('value');
			}
		}

		setOptionSelected( value ){
			if( this.highlightedOption ){
				this.highlightedOption.selected = value;
				this.refreshOptionPreview('selected');
			}
		}

		getOption( optionValue ){
			return this.options.filter((option)=>option.value===optionValue)[0];
		}

		getOptionActiveTerms( optionValue ){
			let option = this.getOption(optionValue);
			return option.activeTerms;
		}

		setActiveTerms( termNames ){
			
			if( !this.highlightedOption ){
				return;
			}

			this.highlightedOption.activeTerms = termNames;
			this.updateDependentTerms();
		}

		removeActiveTerm( termName ){
			this.options.every((option)=>{
				option.removeActiveTerm( termName );
			});
		} 

		refreshOptionPreview( column ){
			if( !this.highlightedOption )	return;

			this.options.every((option, index, ary)=>{
				if( option === this.highlightedOption ){
					switch( column ){
						case 'label':
							ListTerm.$OPTION_TABLE.find('tr:nth-child('+(index+1)+') td.option-label' )
									.empty()
									.text( this.highlightedOption.labelMap[CURRENT_LANGUAGE] );
							break;
						case 'value':
							ListTerm.$OPTION_TABLE.find('tr:nth-child('+(index+1)+') td.option-value' )
									.empty()
									.text( this.highlightedOption.value );
							break;
						case 'selected':
							let selectedOption = ListTerm.$OPTION_TABLE.find('tr:nth-child('+(index+1)+') td.option-selected' ).empty();
							if( this.highlightedOption.selected ){
								this.clearSelectedOption();
								selectedOption.html('&#10004;');
							}
							
							break;
					}
					
					return STOP_EVERY;
				}

				return CONTINUE_EVERY;
			})
		}

		renderOptions(){
			let $panel = ListTerm.$OPTION_TABLE;

			this.options.every((option)=>{
				$panel.append( option.$renderPreview() );
			});
		}

		configureMultipleSeletionMode( mode ){
			if( mode === true ){
				this.dependentTerms = new Array();
				ListTerm.$OPTION_ACTIVE_TERMS.empty();

				this.options.forEach((option)=>{
					option.activeTerms = null;
				});
			}
			else{
				this.constructOptionActiveTermsSelector();
			}
		}

		constructOptionActiveTermsSelector(){
			if( !ListTerm.AVAILABLE_TERMS || ListTerm.AVAILABLE_TERMS.length === 0 ){
				return null;
			}

			let $activeTermsSelector = $(
					'<div class="card-horizontal main-content-card">' +
						'<div aria-multiselectable="true" class="panel-group" role="tablist">' +
							'<fieldset aria-labelledby="'+NAMESPACE+'activeTermsTitle" id="'+NAMESPACE+'activeTerms" role="group">' +
								'<div class="panel-heading" id="'+NAMESPACE+'activeTermsHeader" role="presentation">' +
									'<div class="panel-title" id="'+NAMESPACE+'activeTermsTitle">' +
										'Active Terms' +
										'<span class="taglib-icon-help lfr-portal-tooltip" data-title="'+'helpMessage'+'" style="margin-left:5px;">' +
											'<span>' +
												'<svg class="lexicon-icon lexicon-icon-question-circle-full" focusable="false" role="presentation" viewBox="0 0 512 512">' +
													'<path class="lexicon-icon-outline" d="M256 0c-141.37 0-256 114.6-256 256 0 141.37 114.629 256 256 256s256-114.63 256-256c0-141.4-114.63-256-256-256zM269.605 360.769c-4.974 4.827-10.913 7.226-17.876 7.226s-12.873-2.428-17.73-7.226c-4.857-4.827-7.285-10.708-7.285-17.613 0-6.933 2.428-12.844 7.285-17.788 4.857-4.915 10.767-7.402 17.73-7.402s12.932 2.457 17.876 7.402c4.945 4.945 7.431 10.854 7.431 17.788 0 6.905-2.457 12.786-7.431 17.613zM321.038 232.506c-5.705 8.923-13.283 16.735-22.791 23.464l-12.99 9.128c-5.5 3.979-9.714 8.455-12.668 13.37-2.955 4.945-4.447 10.649-4.447 17.145v1.901h-34.202c-0.439-2.106-0.731-4.184-0.936-6.291s-0.321-4.301-0.321-6.612c0-8.397 1.901-16.413 5.705-24.079s10.24-14.834 19.309-21.563l15.185-11.322c9.070-6.7 13.605-15.009 13.605-24.869 0-3.57-0.644-7.080-1.901-10.533s-3.219-6.495-5.851-9.128c-2.633-2.633-5.969-4.71-9.977-6.291s-8.66-2.369-13.927-2.369c-5.705 0-10.561 1.054-14.571 3.16s-7.343 4.769-9.977 8.017c-2.633 3.247-4.594 7.022-5.851 11.322s-1.901 8.66-1.901 13.049c0 4.213 0.41 7.548 1.258 10.065l-39.877-1.58c-0.644-2.311-1.054-4.652-1.258-7.080-0.205-2.399-0.321-4.769-0.321-7.080 0-8.397 1.58-16.619 4.74-24.693s7.812-15.214 13.927-21.416c6.114-6.173 13.663-11.176 22.645-14.951s19.368-5.676 31.188-5.676c12.229 0 22.996 1.785 32.3 5.355 9.274 3.57 17.087 8.25 23.435 14.014 6.319 5.764 11.089 12.434 14.248 19.982s4.74 15.331 4.74 23.289c0.058 12.581-2.809 23.347-8.514 32.27z"></path>' +
												'</svg>' +
											'</span>' +
											'<span class="taglib-text hide-accessible">'+'helpMessage'+'</span>' +
										'</span>'+
									'</div>' +
								'</div>' +
								'<div aria-labelledby="'+NAMESPACE+'activeTermsHeader" class="in  " id="'+NAMESPACE+'activeTermsContent" role="presentation">' +
									'<div class="panel-body">' +
									'</div>' +
								'</div>' +
							'</fieldset>' +
						'</div>' +
					'</div>'
			);
			
			let $panelBody = $activeTermsSelector.find('.panel-body');

			let self = this;
			if( ListTerm.AVAILABLE_TERMS ){
				ListTerm.AVAILABLE_TERMS.forEach((term)=>{
					let checked = '';
					if( this.highlightedOption && 
						this.highlightedOption.activeTerms && 
						this.highlightedOption.activeTerms.includes(term.termName) ){
						checked = 'checked'
					}

					let $checkbox = $(
						'<div class="form-group form-inline input-checkbox-wrapper" style="display:inline-block;margin-right:20px;">' +
							'<label for="">' +
								'<input class="field" name="'+NAMESPACE+'activeTerms" type="checkbox" value="' + term.termName + '"' + checked +' style="margin-right:5px;">' +
								term.displayName.getText(CURRENT_LANGUAGE) +
							'</label>' +
						'</div>' );

					$checkbox.click(function(event){
						let $input = $(this).find('input');
						let checked = $input.prop('checked');
						let termName = $input.val();
						
						if( this.highlightedOption ){
							checked ? 
								this.highlightedOption.addActiveTerm( termName ) :
								this.highlightedOption.removeActiveTerm( termName );
							
							console.log( 'active terms changed');

							let eventData = {
								sourcePortlet: NAMESPACE,
								targetPortlet: NAMESPACE,
								termName: self.termName,
								activeTerm: termName
							};

							Liferay.fire(
								SXIcecapEvents.DATATYPE_ACTIVE_TERM_CHANGED,
								eventData
							);
						}
					});

					$panelBody.append( $checkbox );
				});
			}

			ListTerm.$OPTION_ACTIVE_TERMS.empty();
			ListTerm.$OPTION_ACTIVE_TERMS.append( $activeTermsSelector );
		}

		$render( renderInputUrl, forWhat ){
			this.updateDependentTerms();
			console.log('updateDependentTerms: ', this.dependentTerms);
			let options = new Array();
			this.options.forEach((option)=>{
				let rOption = {};

				rOption.label = option.labelMap[CURRENT_LANGUAGE];
				rOption.value = option.value;
				rOption.selected = option.selected;
				rOption.activeTerms = option.activeTerms;
				rOption.inactiveTerms = this.dependentTerms.filter((termName)=>!option.activeTerms.includes(termName));
				console.log('rOption: ', rOption );

				options.push( rOption );
			});

			let params = Liferay.Util.ns(NAMESPACE, {
					controlType: 'list',
					renderType: (forWhat === SXConstants.FOR_PREVIEW) ? SXConstants.FOR_PREVIEW : SXConstants.FOR_EDITOR,
					termName:this.termName,
					controlName: NAMESPACE+this.termName,
					label: this.displayName.getText(CURRENT_LANGUAGE),
					required: this.mandatory ? this.mandatory : false,
					value: this.value ? this.value : '',
					helpMessage: this.getLocalizedTooltip() ? this.getLocalizedTooltip() : '',
					displayStyle: this.displayStyle,
					options: JSON.stringify( options ),
					dependentTerms: this.dependentTerms ? JSON.stringify(this.dependentTerms) : ''
			});

			return FormUIUtil.$getRenderedFormControl( renderInputUrl, params );
		}

		initAllAttributes(){
			super.initAllAttributes( 'List' );

			this.options = new Array();
			ListTerm.$OPTION_TABLE.empty();
			this.displayStyle = 'select';
			this.dependentTerms = new Array();
			ListTerm.$OPTION_ACTIVE_TERMS.empty();
		}

		getDisplayStyleFormValue ( save ){
			let value = FormUIUtil.getFormRadioValue( 'listDisplayStyle' );
			if( save ){
				this.displayStyle = value;
			}
			
			return value;
		}
		setDisplayStyleFormValue ( value ){
			if( value ){
				FormUIUtil.setFormRadioValue( 'listDisplayStyle', value );
			}
			else if( this.displayStyle ){
				FormUIUtil.setFormRadioValue( 'listDisplayStyle', this.displayStyle );
			}
			else{
				FormUIUtil.setFormRadioValue( 'listDisplayStyle' );
			}
		}

		getOptionLabelFormValue (){
			return FormUIUtil.getFormLocalizedValue( 'optionLabel' );
		}
		setOptionLabelFormValue ( valueMap ){
			if( valueMap ){
				FormUIUtil.setFormLocalizedValue( 'optionLabel', valueMap );
			}
			else if( this.highlightedOption && this.highlightedOption.labelMap ){
				FormUIUtil.setFormLocalizedValue( 'optionLabel', this.highlightedOption.labelMap );
			}
			else{
				FormUIUtil.setFormLocalizedValue( 'optionLabel' );
			}
		}

		getOptionValueFormValue (){
			return FormUIUtil.getFormValue( 'optionValue' );
		}
		setOptionValueFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( 'optionValue', value );
			}
			else if( this.highlightedOption && this.highlightedOption.value ){
				FormUIUtil.setFormValue( 'optionValue', this.highlightedOption.value );
			}
			else{
				FormUIUtil.setFormValue( 'optionValue' );
			}
		}

		getOptionSelectedFormValue (){
			return FormUIUtil.getFormCheckboxValue( 'optionSelected' );
		}
		setOptionSelectedFormValue ( value ){
			if( value ){
				FormUIUtil.setFormCheckboxValue( 'optionSelected', value );
			}
			else if( this.highlightedOption && this.highlightedOption.selected ){
				FormUIUtil.setFormCheckboxValue( 'optionSelected', this.highlightedOption.selected );
			}
			else{
				FormUIUtil.setFormCheckboxValue( 'optionSelected' );
			}
		}

		getActiveTermsFormValue (){
			let value = FormUIUtil.getFormCheckedArray( 'activeTerms' );
			
			return value;
		}
		setActiveTermsFormValue ( termNames ){
			if( termNames ){
				FormUIUtil.setFormCheckedArray( 'activeTerms', termNames );
			}
			else if( this.highlightedOption && this.highlightedOption.activeTerms ){
				FormUIUtil.setFormCheckedArray( 'activeTerms', this.highlightedOption.activeTerms );
			}
			else{
				FormUIUtil.setFormCheckedArray( 'activeTerms' );
			}
		}

		initOptionFormValues( option ){
			if( !option ){
				this.highlightedOption = null;	
			}
			else{
				this.highlightedOption = option;
			}
			
			this.setOptionLabelFormValue();
			this.setOptionValueFormValue();
			this.setOptionSelectedFormValue();
			this.setActiveTermsFormValue();

			this.highlightOptionPreview();
		}

		parse( json ){
		}
		
		toJSON(){
			let json = super.toJSON();
			
			json.options = this.options;
			json.displayStyle = this.displayStyle;
			
			return json;

		}
	}
	
	/* 4. ListArrayTerm */
	class ListArrayTerm extends Term {
		constructor(){
			
		}
	}
	
	/* 5. EMailTerm */
	class EMailTerm  extends Term{
		constructor(){
			
		}
	}
	
	/* 6. AddressTerm */
	class AddressTerm extends Term{
		constructor(){
			
		}
	}

	/* 7. ArrayTerm */
	class ArrayTerm extends Term{
		constructor(){
			
		}
	}
	
	/* 8. MatrixTerm */
	class MatrixTerm extends Term{
		constructor(){
			
		}
	}
	
	/* 9. ObjectTerm */
	class ObjectTerm extends Term{
		constructor(){
			
		}
	}
	
	/* 10. ObjectArrayTerm */
	class ObjectArrayTerm extends Term{
		constructor(){
			
		}
	}


	/* 11. PhoneTerm */
	class PhoneTerm extends Term{
		constructor(){
			
		}
	}
	
	/* 12. DateTerm */
	class DateTerm extends Term{
		constructor(){
			
		}
	}
	
	/* 13. FileTerm */
	class FileTerm extends Term{
		constructor(){
			
		}
	}

	/* 14. FileArrayTerm */
	class FileArrayTerm extends Term{
		constructor(){
			
		}
	}

	/* 15. DataLinkTerm */
	class DataLinkTerm extends Term{
		constructor(){
			
		}
	}

	/* 16. DataLinkArrayTerm */
	class DataLinkArrayTerm extends Term{
		constructor(){
			
		}
	}

	/* 17. CommentTerm */
	class CommentTerm extends Term{
		constructor(){
			
		}
	}

	/* 18. GroupTerm */
	class GroupTerm extends Term{
		constructor(){
			
		}
	}

	/* 19. BooleanTerm */
	class BooleanTerm extends Term{
		constructor(){
			
		}
	}
	
	/* 20. IntergerTerm */
	class IntegerTerm extends NumericTerm{
		constructor(){
			
		}
	}

	class DataStructure {
		static $PREVIEW_PANEL = $('#'+NAMESPACE+'previewPanel');
		static FORM_RENDER_URL = ''

		constructor(){
			this.dataTypeId = 0;
			this.termDelimiter='\n';
			this.termDelimiterPosition = true;
			this.matrixBracketType='[';
			this.matrixDelimiter=' ';
			this.commentString='#';
			this.tooltip = new LocalizedObject();
			this.terms = new Array();
			this.dirty = false;
			this.displayTooltip = true;
			this.selectedTerm = null;
		}
		
		/***********************************************************************
		 *  APIs for form controls
		 ***********************************************************************/

		getTermDelimiterFormValue ( save ){
			let value = FormUIUtil.getFormValue( 'termDelimiter' );
			if( save ){
				this.termDelimiter = value;
			}
			
			return value;
		}
		setTermDelimiterFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( 'termDelimiter', value );
			}
			else if( this.termDelimiter ){
				FormUIUtil.setFormValue( 'termDelimiter', this.termDelimiter );
			}
			else{
				FormUIUtil.clearFormValue( 'termDelimiter' );
			}
		}

		getTermDelimiterPositionFormValue ( save ){
			let value = FormUIUtil.getFormValue( 'termDelimiterPosition' );
			if( save ){
				this.termDelimiter = value;
			}
			
			return value;
		}
		setTermDelimiterPositionFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( 'termDelimiterPosition', value );
			}
			else if( this.termDelimiterPosition ){
				FormUIUtil.setFormValue( 'termDelimiterPosition', this.termDelimiterPosition );
			}
			else{
				FormUIUtil.clearFormValue( 'termDelimiterPosition' );
			}
		}
		
		getTermValueDelimiterFormValue ( save ){
			let value = FormUIUtil.getFormValue( 'termValueDelimiter' );
			if( save ){
				this.termDelimiter = value;
			}
			
			return value;
		}
		setTermValueDelimiterFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( 'termValueDelimiter', value );
			}
			else if( this.termValueDelimiter ){
				FormUIUtil.setFormValue( 'termValueDelimiter', this.termValueDelimiter );
			}
			else{
				FormUIUtil.clearFormValue( 'termValueDelimiter' );
			}
		}
		
		getMatrixBracketTypeFormValue ( save ){
			let value = FormUIUtil.getFormValue( 'matrixBracketType' );
			if( save ){
				this.matrixBracketType = value;
			}
			
			return value;
		}
		setMatrixBracketTypeFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( 'matrixBracketType', value );
			}
			else if( this.matrixBracketType ){
				FormUIUtil.setFormValue( 'matrixBracketType', this.matrixBracketType );
			}
			else{
				FormUIUtil.clearFormValue( 'matrixBracketType' );
			}
		}

		getMatrixElementDelimiterFormValue ( save ){
			let value = FormUIUtil.getFormValue( 'matrixElementDelimiter' );
			if( save ){
				this.matrixElementDelimiter = value;
			}
			
			return value;
		}
		setMatrixElementDelimiterFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( 'matrixElementDelimiter', value );
			}
			else if( this.matrixElementDelimiter ){
				FormUIUtil.setFormValue( 'matrixElementDelimiter', this.matrixElementDelimiter );
			}
			else{
				FormUIUtil.clearFormValue( 'matrixElementDelimiter' );
			}
		}
		
		getCommentCharFormValue ( save ){
			let value = FormUIUtil.getFormValue( 'commentChar' );
			if( save ){
				this.commentChar = value;
			}
			
			return value;
		}
		setCommentCharFormValue ( value ){
			if( value ){
				FormUIUtil.setFormValue( 'commentChar', value );
			}
			else if( this.matrixElementDelimiter ){
				FormUIUtil.setFormValue( 'commentChar', this.commentChar );
			}
			else{
				FormUIUtil.clearFormFormValue( 'commentChar' );
			}
		}

		replaceVisibleTypeSpecificSection( termType ){
			FormUIUtil.replaceVisibleTypeSpecificSection( termType );
		}

		disable( controlIds, disable ){
			FormUIUtil.disableControls( controlIds, disable );
		}


		/*****************************************************************
		 * APIs for DataStructure instance
		 *****************************************************************/
		
		loadDataStructure( url, paramData ){
			let params = Liferay.Util.ns( NAMESPACE, paramData);
			
			$.ajax({
				url: url,
				method: 'post',
				data: params,
				dataType: 'json',
				success: function( dataStructure ){
					console.log( dataStruture );
					parse( dataStruture );
				},
				error: function( data, e ){
					console.log(data);
					console.log('AJAX ERROR-->' + e);
				}
			});
		}
		
		createTerm( termType ){
			switch( termType ){
			case 'String':
				return new StringTerm();
			case 'Numeric':
				return new NumericTerm();
			case 'Integer':
				return new IntegerTerm();
			case 'List':
				ListTerm.AVAILABLE_TERMS = this.terms;
				return new ListTerm();
			case 'ListArray':
				return new ListArrayTerm();
			case 'Boolean':
				return new BooleanTerm();
			case 'Array':
				return new ArrayTerm();
			case 'EMail':
				return new EMailTerm();
			case 'Date':
				return new DateTerm();
			case 'Address':
				return new AddressTerm();
			case 'Phone':
				return new PhoneTerm();
			case 'Matrix':
				return new MatrixTerm();
			case 'Object':
				return new ObjectTerm();
			case 'ObjectArray':
				return new ObjectArrayTerm();
			case 'File':
				return new FileTerm();
			case 'FileArray':
				return new FileArrayTerm();
			case 'DataLink':
				return new FileTerm();
			case 'DataLinkArray':
				return new DataLinkArrayTerm();
			case 'Comment':
				return new CommentTerm();
			case 'Group':
				return new GroupTerm();
			default:
				return new StringTerm();
			}
		}

		copyTerm( term ){
			let copied = Object.assign( this.createTerm(term.termType), term );

			copied.termName = '';
			// this.selectedTerm = null;

			console.log( 'Copied Term: ', copied );

			return copied;
		}
		
		getTerm( termName ){
			if( !termName ){
				return null;
			}
			
			let searchedTerm = null;
			
			this.terms.every( (term) => {
				if( term.termName === termName ){
					searchedTerm = term;
					console.log('STOP: ', term );
					return STOP_EVERY;
				}
				
				return CONTINUE_EVERY;
			});
			
			console.log('searchedTerm: ', searchedTerm);
			return searchedTerm;
		}
		
		getSelectedTerm(){
			return this.selectedTerm;
		}
		
		setSelectedTerm( term ){
			this.selectedTerm = term;
			
			if( term === null ){
				DataStructure.$PREVIEW_PANEL.find('.highlight-border').removeClass('highlight-border');
			}
		}

		
		/*******************************************************************
		 * Add a term to the data structure. If preview is true, 
		 * than the term will be previewd on the preview panel which is 
		 * specified when the data structure instance was created.
		 *  
		 *  @PARAMS
		 *  	term : Term instance to be added or inserted
		 *  	preview: boolean - preview or not
		 ********************************************************************/
		addTerm( term, forWhat ){
			if( term.validate() === false ){
				return false;
			}
			
			this.terms.push( term );
			
			if( forWhat === SXConstants.FOR_PREVIEW ){
				this.renderTermPreview( term );
			}
			
			this.selectedTerm = term;

			return true;
		}

		removeTerm( termName ){
			this.terms = this.terms.filter( function( term, index, ary ){
				if( term.termName === termName ){
					term.removeActiveTerm( termName );
					return false;
				}	
				else	return true;
			});
		}

		removeActiveTerm( termName ){
			this.terms.every((term)=>{
				term.removeActiveTerm( termName );
			});
		}
		
		exist( termName ){
			let exist = false;
			
			this.terms.every( (term) => {
				if( term.termName === termName ){
					exist = true;
					return STOP_EVERY;
				}
				
				return CONTINUE_EVERY;
			});
			
			return exist;
		}
		
		parse( json ){
			
		}

		countTerms(){
			return this.terms.length;
		}
		
		toJSON(){
			return{
				dataTypeId : this.dataTypeId,
				termDelimiter : this.termDelimiter,
				termDelimiterPosition : this.termDelimiterPosition,
				matrixBracketType : this.matrixBracketType,
				matrixDelimiter : this.matrixDelimiter,
				commentString : this.commentString,
				tooltip : this.tooltip.localizedMap,
				terms : this.terms 
			};
		}


		/********************************************************************
		 * APIs for Preview panel
		 ********************************************************************/

		activateDependentTerms( termName, optionValue, forWhat ){
			let term = this.getTerm( termName );

			let activeTerms = term.getOptionActiveTerms( optionValue );
			console.log('Terms to be activated...', activeTerms);

			if( forWhat === SXConstants.FOR_PREVIEW ){
				term.dependentTerms.forEach((termName)=>{
					if( activeTerms.includes(termName) ){
						console.log( 'active term: '+termName, $('tr.'+NAMESPACE+termName) );
						$('tr.'+NAMESPACE+termName).removeClass('hide');
					}
					else{
						console.log( 'inactive term: '+termName, $('tr.'+NAMESPACE+termName));
						$('tr.'+NAMESPACE+termName).addClass('hide');
					}
				});
			}
		}

		previewed( term ){
			if( this.selectedTerm === term ){
				return true;
			}
			
			return this.exist( term.termName );
		}
		
		renderTermPreview( term, order ){
			
			// Change the previous highlighted border to normal 
			let $panel = DataStructure.$PREVIEW_PANEL;
			
			$panel.find('.highlight-border').each( function(){
				$(this).removeClass('highlight-border');
			});
			
			let self = this;
			$.when(term.$render( DataStructure.FORM_RENDER_URL, SXConstants.FOR_PREVIEW )).done(function( $row ){
				$row.addClass('highlight-border');
				$row.click( function( event ){
					if( $(event.target).is('button') || $(event.target).is('i') ){
						let idToBeRemoved = NAMESPACE+'toBeRemoved';
						
						$(event.currentTarget).attr('id', idToBeRemoved);
						$panel.find('#'+idToBeRemoved).remove();
						
						const eventData = {
								sourcePortlet: NAMESPACE,
								targetPortlet: NAMESPACE,
								deletedTerm: term
						};
						
						Liferay.fire (SXIcecapEvents.DATATYPE_PREVIEW_TERM_DELETED, eventData );
					}
					else{
						// Change the previous highlighted border to normal 
						$panel.find('.highlight-border').each( function(){
							$(this).removeClass('highlight-border');
						});
						
						const eventData = {
							sourcePortlet: NAMESPACE,
							targetPortlet: NAMESPACE,
							selectedTerm: term
						};
						
						Liferay.fire( SXIcecapEvents.DATATYPE_PREVIEW_TERM_SELECTED, eventData );
					}
	
					$(this).addClass('highlight-border');
				});
				
				if( order >= 0 ){
					self.replacePreviewRow( order, $row );
				}
				else{
					$panel.append( $row );
				}
			});
			
			
		}

		$renderTermEditor(){
			return null;
		}
		
		replacePreviewRow( order, $row ){
			let rowIndex = order + 1;
			let $panel = DataStructure.$PREVIEW_PANEL;

			this.removePreviewRow( rowIndex );
			
			if( $panel.children( ':nth-child('+rowIndex+')' ).length === 0 ){
				$panel.append($row);
			}
			else{
				$panel.children( ':nth-child('+rowIndex+')' ).before( $row );
			}
		}
		
		removePreviewRow( order ){
			DataStructure.$PREVIEW_PANEL.children( ':nth-child('+order+')' ).remove();
		}
		
		render( forWhat ){
			if( forWhat === SXConstants.FOR_PREVIEW ){
				DataStructure.$PREVIEW_PANEL.empty();

				this.terms.forEach((term)=>{
					this.renderTermPreview( term );
				});
			}
			else{
				this.terms.forEach((term)=>{
					this.renderTermEditor( term );
				});
			}
		}
		
		refreshSelectedTermPreview(){
			// Find index of the term on the preview
			this.terms.every((term, index, err)=>{
				if( term === this.selectedTerm ){
					this.renderTermPreview( term, index);
					return STOP_EVERY;
				}
				else{
					return CONTINUE_EVERY;
				}
			});
		}
		
		
	}
	
    return {
    	namespace: NAMESPACE,
    	defaultLanguage: DEFAULT_LANGUAGE,
    	availableLanguages: AVAILABLE_LANGUAGES,
    	LocalizationUtil: LocalizationUtil,
    	DataType: DataType,
    	newDataType: function(){
    		return new DataType();
    	},
    	DataStructure: DataStructure,
    	newDataStructure: function (){
    		return new DataStructure();
    	},
    	SXIcecapEvents: SXIcecapEvents,
		SXConstants: SXConstants, 
    	TermTypes: TermTypes,
    	Term: Term,
    	newTerm: function( termType ){
    		if( !termType ){
    			return new StringTerm();
    		}
    		
    		switch( termType ){
	    		case TermTypes.STRING:
	    			return new StringTerm();
	    		case TermTypes.NUMERIC:
	    			return new NumericTerm();
	    		case TermTypes.LIST:
	    			return new ListTerm();
	    		case TermTypes.LIST_ARRAY:
	    			return new ListArrayTerm();
	    		case TermTypes.EMAIL:
	    			return new EMailTerm();
	    		case TermTypes.ADDRESS:
	    			return new AddressTerm();
	    		case TermTypes.ARRAY:
	    			return new ArrayTerm();
	    		case TermTypes.Matrix:
	    			return new MatrixTerm();
	    		case TermTypes.OBJECT:
	    			return new ObjectTerm();
	    		case TermTypes.OBJECT_ARRAY:
	    			return new ObjectArrayTerm();
	    		case TermTypes.PHONE:
	    			return new PhoneTerm();
	    		case TermTypes.DATE:
	    			return new DateTerm();
	    		case TermTypes.FILE:
	    			return new FileTerm();
	    		case TermTypes.FILEArray:
	    			return new FileArrayTerm();
	    		case TermTypes.DATA_LINK:
	    			return new DataLinkTerm();
	    		case TermTypes.DATA_LINK_ARRAY:
	    			return new DataLinkArrayTerm();
	    		case TermTypes.COMMENT:
	    			return new CommentTerm();
	    		case TermTypes.GROUP:
	    			return new GroupTerm();
	    		default:
	    			return null;
    		}
    	},
    	StringTerm: StringTerm,
    	NumericTerm: NumericTerm,
		ListTerm: ListTerm,
    	Util: Util
    };
}


