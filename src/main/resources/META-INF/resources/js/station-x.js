function StationX ( NAMESPACE, DEFAULT_LANGUAGE, CURRENT_LANGUAGE, AVAILABLE_LANGUAGES ) {

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
		 LIST_ITEM : 'listItem',
		 LIST_ITEM_VALUE : 'listItemValue',
		 LIST_ITEMS : 'listItems',
		 MANDATORY : 'mandatory',
		 NAME : 'name',
		 MAX_BOUNDARY : 'maxBoundary',
		 MAX_LENGTH :"maxLength",
		 MAX_VALUE :"maxValue",
		 MIN_BOUNDARY : 'minBoundary',
		 MIN_LENGTH :"minLength",
		 MIN_VALUE :"minValue",
		 MULTIPLE_LINE :"multipleLine",
		 ORDER : 'order',
		 PATH : 'path',
		 PATH_TYPE : 'pathType',
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
		
		static getLocalizedInputValue( inputId ){
			let baseId = NAMESPACE + inputId;
			const selectedLanguage = LocalizationUtil.getSelectedLanguage( inputId ).trim();
			
			return AVAILABLE_LANGUAGES.reduce( ( obj, locale ) => {
				let localizedInputId = NAMESPACE+inputId+'_'+locale;
				
				if( selectedLanguage === locale ){
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
	
	class FormUIUtil {
		constructor(){}
		
		static getFormRadioValue = function( attrName ){
			return $('input[name="'+NAMESPACE+attrName+'"].checked').val();
		}
		
		static setFormRadioValue = function( attrName, value ){
			let $radios = $('input[name="'+NAMESPACE+attrName+'"]' );
			
			if( value ){
				$radios.every(($radio)=>{
					
				});
			}
		}
		
		static getFormCheckboxValue = function( attrName ){
			let $control = $('#'+NAMESPACE+attrName);
			
			return $control.prop('checked');
		}
		
		static setFormCheckboxValue = function( attrName, value, focus ){
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
		}
		
		
		static getFormValue = function( attrName ){
			return $('#'+NAMESPACE+attrName).val();
		};
		
		static setFormValue = function( attrName, value, focus ){
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
		};
		
		static clearFormValue( attrName ){
			FormUIUtil.setFormValue( attrName );
		}
		
		static getFormLocalizedValue = function( attrName ){
			return LocalizationUtil.getLocalizedInputValue( attrName );
		}
		
		static setFormLocalizedValue = function( attrName, localizedMap, focus ){
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
		}
	}
	
	const SXIcecapEvents = {
		DATATYPE_PREVIEW_TERM_DELETED: 'DATATYPE_PREVIEW_TERM_DELETED',
		DATATYPE_PREVIEW_TERM_SELECTED: 'DATATYPE_PREVIEW_TERM_SELECTED'
	}
	
	class LocalizedObject {
		constructor( jsonContent  ){
			this.localizedMap = {};
			
			if( jsonContent ){
				parseJSON( jsonContent );
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
		
		parseJSON( jsonContent ){
			let content = jsonContent;
			if( typeof jsonContent === 'string' ){
				content = JSON.parse( jsonContent );
			}
			
			for( key in content ){
				this.localizedMap[key] = content[key];
			}
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

		static FOR_PREVIEW = true;
		static FOR_EDITOR = false;

		static render( term, forWhat ){
			if( forWhat === Term.FOR_PREVIEW ){
				return term.renderPreview();
			}
			else{
				return term.renderEditControl();
			}
		}

		
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
			
			this.order = 0;
			this.state = Term.STATE_INIT;
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
				return '';
			}
			else{
				return this.tooltip.getText(CURRENT_LANGUAGE);
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
			let valueMap = FormUIUtil.getFormLocalizedValue( TermAttributes.DISPLAY_NAME );
			if( save ){
				this.displayName = new LocalizedObject();
				this.displayName.setLocalizedMap( valueMap );
			}
			
			return valueMap;
		}
		setDisplayNameFormValue ( valueMap ){
			if( valueMap ){ 
				FormUIUtil.setFormLocalizedValue( TermAttributes.DISPLAY_NAME, valueMap );
			}
			else if( this.displayName ){
				FormUIUtil.setFormLocalizedValue( TermAttributes.DISPLAY_NAME, this.displayName.getLocalizedMap() );
			}
			else{
				FormUIUtil.setFormLocalizedValue( TermAttributes.DISPLAY_NAME );
			}
		}
		
		getDefinitionFormValue ( save ){
			let valueMap = FormUIUtil.getFormLocalizedValue( TermAttributes.DEFINITION );
			if( save ){
				this.definition = new LocalizedObject();
				this.definition.setLocalizedMap( valueMap );
			}
			
			return valueMap;
		}
		setDefinitionFormValue ( valueMap ){
			if( valueMap ){
				FormUIUtil.setFormLocalizedValue( TermAttributes.DEFINITION, valueMap );
			}
			else if( this.definition ){
				FormUIUtil.setFormLocalizedValue( TermAttributes.DEFINITION, this.definition.getLocalizedMap() );
			}
			else{
				FormUIUtil.setFormLocalizedValue( TermAttributes.DEFINITION );
			}
		}

		getTooltipFormValue ( save ){
			let valueMap = FormUIUtil.getFormLocalizedValue( TermAttributes.TOOLTIP );

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
				FormUIUtil.setFormLocalizedValue( TermAttributes.TOOLTIP, valueMap );
			}
			else if( this.tooltip ){
				FormUIUtil.setFormLocalizedValue( TermAttributes.TOOLTIP, this.tooltip.getLocalizedMap() );
			}
			else{
				FormUIUtil.setFormLocalizedValue( TermAttributes.TOOLTIP );
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
		
	} // End of Term
	
	/* 1. String */
	class StringTerm extends Term {
		static DEFAULT_MIN_LENGTH = 1;
		static DEFAULT_MAX_LENGTH = 72;
		static DEFAULT_MULTIPLE_LINE = false;
		static DEFAULT_VALIDATION_RULE = "^[\w\s!@#\$%\^\&*\)\(+=._-]*$"
		
		constructor(){
			super( 'String' );
			
			this.minLength = StringTerm.DEFAULT_MIN_LENGTH;
			this.maxLength = StringTerm.DEFAULT_MAX_LENGTH;
			this.multipleLine = StringTerm.DEFAULT_MULTIPLE_LINE;
			this.validationRule = StringTerm.DEFAULT_VALIDATION_RULE;
			
			this.setAllFormValues();
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
		render( forWhat ){
			let template = $('#template'+this.termType).html();
			let params = {
				name: this.termName,
				label: this.displayName.getText(CURRENT_LANGUAGE),
				required: this.mandatory ? this.mandatory : false,
				multipleLine: this.multipleLine ? this.multipleLine : false,
				defaultValue: this.value ? this.value : '',
				helpMessage: this.getLocalizedTooltip()
			};

			if( forWhat === Term.FOR_PREVIEW ){
				params.preview = Term.FOR_PREVIEW;
			}

			return $( Mustache.render(template, params) );
		}

		renderEditControl(){
			return null;
		}
		
		renderAttributeSection( panelId, setionTitle ){
			let $panel = $('#'+NAMESPACE+panelId);
			let template = $('#'+NAMESPACE+'templateStringAttrs').html();
			let params = {
					fieldSetLabel: setionTitle	
				};
			let html = Mustache.render(template, params);
			
			$panel.empty();
			$panel.append( html );
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
		
		validation(){
			
		}
	}
	
	/* 2. NumericTerm */
	class NumericTerm extends Term{
		constructor(){
			super('Numeric');
			
			this.minValue = null;
			this.minBoundary = false;
			this.maxValue = null;
			this.maxBoundary = false;
			this.unit = null;
			this.uncertainty = false;
			this.sweepable = false;
			
			this.setAllFormValues();
		}
		
		renderPreview(){
			let template = $('#template'+this.termType).html();
			
			let params = {
					name: this.termName,
					label: this.displayName.getText(CURRENT_LANGUAGE),
					required: this.mandatory ? this.mandatory : false,
					minValue: this.minValue ? this.minValue : '',
					minBoundary: this.minBoundary ? this.minBoundary : false,
					maxValue: this.maxValue ? this.maxValue : '',
					maxBoundary: this.maxBoundary ? this.maxBoundary : false,
					unit: this.unit?this.unit : '',
					uncertainty: this.uncertainty ? this.uncertainty : false,
					helpMessage: this.getLocalizedTooltip()
			};

			return $( Mustache.render(template, params) );
		}

		renderEditControl(){
			return null;
		}
		
		renderAttributeSection( panelId, setionTitle ){
			let $panel = $('#'+NAMESPACE+panelId);
			let template = $('#'+NAMESPACE+'templateNumericAttrs').html();
			let params = {
					fieldSetLabel: setionTitle	
				};
			let html = Mustache.render(template, params);
			
			$panel.empty();
			$panel.append( html );
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
		constructor(){

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
		static FOR_PREVIEW = true;
		static FOR_EDITOR = false;

		constructor( previewPanelId ){
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
			this.$previewPanel = $('#'+NAMESPACE+previewPanelId).find('tbody');
			
			// Registration of liferay event handlers
			let self = this;
			Liferay.on(SXIcecapEvents.DATATYPE_PREVIEW_TERM_DELETED, function(eventData){
				self.terms = self.terms.filter( function( term, index, ary ){
					if( term === eventData.deletedTerm )	return false;
					else	return true;
				});
			});
			
			Liferay.on(SXIcecapEvents.DATATYPE_PREVIEW_TERM_SELECTED, function(eventData){
				if( self.selectedTerm === eventData.selectedTerm ){
					return;
				}
				
				self.selectedTerm = eventData.selectedTerm;
				self.selectedTerm.renderAttributeSection();
				self.selectedTerm.setAllFormValues();
			});
		}
		
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
				this.$previewPanel.find('.highlight-border').removeClass('highlight-border');
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
		addTerm( term, preview ){
			if( term.validate() === false ){
				return false;
			}
			
			this.terms.push( term );
			
			if( preview ){
				this.renderTermPreview( term );
			}
			
			this.selectedTerm = term;
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
		
		previewed( term ){
			if( this.selectedTerm === term ){
				return true;
			}
			
			return this.exist( term.termName );
		}
		
		
		parse( json ){
			
		}
		
		getPreviewPanel( panelId ){
			return $('#'+NAMESPACE+panelId).find('tbody');
		}
		
		renderTermPreview( term, order ){
			
			// Change the previous highlighted border to normal 
			let $panel = this.$previewPanel;
			
			$panel.find('.highlight-border').each( function(){
				$(this).removeClass('highlight-border');
			});
			
			let $row = Term.render(Term.FOR_PREVIEW).addClass('highlight-border');
			
			$row.click( function( event ){
				if( $(event.target).is('button') || $(event.target).is('i') ){
					let idToBeRemoved = NAMESPACE+'toBeRemoved';
					
					$(event.currentTarget).attr('id', idToBeRemoved);
					$panel.find('#'+idToBeRemoved).remove();
					
					const eventData = {
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
						selectedTerm: term
					};
					
					Liferay.fire( SXIcecapEvents.DATATYPE_PREVIEW_TERM_SELECTED, eventData );
				}

				$(this).addClass('highlight-border');
			});
			
			if( order >= 0 ){
				this.replacePreviewRow( order, $row );
			}
			else{
				$panel.append( $row );
			}
		}

		renderTermEditor(){
			return null;
		}
		
		replacePreviewRow( order, $row ){
			let rowIndex = order + 1;
			
			this.$previewPanel.children( ':nth-child('+rowIndex+')' ).remove();
			
			if( this.$previewPanel.children( ':nth-child('+rowIndex+')' ).length === 0 ){
				this.$previewPanel.append($row);
			}
			else{
				this.$previewPanel.children( ':nth-child('+rowIndex+')' ).before( $row );
			}
		}
		
		removePreviewRow( order ){
			let rowIndex = order + 1;
			this.$previewPanel.children( ':nth-child('+order+')' ).remove();
		}
		
		
		render( forWhat ){
			if( forWhat === FOR_PREVIEW ){
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
    	newDataStructure: function ( previewPanelId ){
    		return new DataStructure( previewPanelId );
    	},
    	SXIcecapEvents: SXIcecapEvents, 
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
    	Util: Util
    };
}


