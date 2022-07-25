let StationX = function ( NAMESPACE, DEFAULT_LANGUAGE, CURRENT_LANGUAGE, AVAILABLE_LANGUAGES ) {

	let MULTI_LANGUAGE = true;
	if( AVAILABLE_LANGUAGES.length < 2 ){
		MULTI_LANGUAGE = false;
	};
	
	let Util = {
		isEmptyArray: function(ary){
			return !ary || ary.length === 0;
		},
		isEmptyObject: function(obj){
			return !obj || Object.keys(obj).length === 0;
		},
		isEmptyString: function(str){
			return !str || str === '';
		}
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
				
				$svg.append( $('<path>').attr({
					'd': 'M323.6,190l146.7-48.8L512,263.9l-149.2,47.6l93.6,125.2l-104.9,76.3l-96.1-126.4l-93.6,126.4L56.9,435.3l92.3-123.9L0,263.8l40.4-122.6L188.4,190v-159h135.3L323.6,190L323.6,190z',
					'class': 'lexicon-icon-outline'
				}) );

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

		CREATE_TERM: function( jsonTerm ){
			switch( jsonTerm.termType ){
			case 'String':
				return new StringTerm( jsonTerm );
			case 'Numeric':
				return new NumericTerm( jsonTerm );
			case 'Integer':
				return new IntegerTerm( jsonTerm );
			case 'List':
				return new ListTerm( jsonTerm );
			case 'Boolean':
				return new BooleanTerm( jsonTerm );
			case 'Array':
				return new ArrayTerm( jsonTerm );
			case 'EMail':
				return new EMailTerm( jsonTerm );
			case 'Date':
				return new DateTerm( jsonTerm );
			case 'Address':
				return new AddressTerm( jsonTerm );
			case 'Phone':
				return new PhoneTerm( jsonTerm );
			case 'Matrix':
				return new MatrixTerm( jsonTerm );
			case 'Object':
				return new ObjectTerm( jsonTerm );
			case 'ObjectArray':
				return new ObjectArrayTerm( jsonTerm );
			case 'File':
				return new FileTerm( jsonTerm );
			case 'FileArray':
				return new FileArrayTerm( jsonTerm );
			case 'DataLink':
				return new FileTerm( jsonTerm );
			case 'DataLinkArray':
				return new DataLinkArrayTerm( jsonTerm );
			case 'Comment':
				return new CommentTerm( jsonTerm );
			case 'Group':
				return new GroupTerm( jsonTerm );
			default:
				return new StringTerm( jsonTerm );
			}
		},

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
		$getRequiredLabelMark: function( style ){
			let html = 
				'<span class="reference-mark text-warning" style="' + style + '">' +
					'<span>' +
						'<svg class="lexicon-icon lexicon-icon-asterisk" focusable="false" role="presentation" viewBox="0 0 512 512">' +
							'<path class="lexicon-icon-outline" d="M323.6,190l146.7-48.8L512,263.9l-149.2,47.6l93.6,125.2l-104.9,76.3l-96.1-126.4l-93.6,126.4L56.9,435.3l92.3-123.9L0,263.8l40.4-122.6L188.4,190v-159h135.3L323.6,190L323.6,190z"></path>' +
						'</svg>' +
					'</span>' +
					'<span class="hide-accessible">Required</span>' +
				'</span>';

			return $(html);
		},
		$getHelpMessageLabelMark: function( helpMessage, style ){
			let html = 
				'<span class="taglib-icon-help lfr-portal-tooltip" title="' + helpMessage + '" style="' + style + '">' +
					'<span>' +
						'<svg class="lexicon-icon lexicon-icon-question-circle-full" focusable="false" role="presentation" viewBox="0 0 512 512">' +
							'<path class="lexicon-icon-outline" d="M256 0c-141.37 0-256 114.6-256 256 0 141.37 114.629 256 256 256s256-114.63 256-256c0-141.4-114.63-256-256-256zM269.605 360.769c-4.974 4.827-10.913 7.226-17.876 7.226s-12.873-2.428-17.73-7.226c-4.857-4.827-7.285-10.708-7.285-17.613 0-6.933 2.428-12.844 7.285-17.788 4.857-4.915 10.767-7.402 17.73-7.402s12.932 2.457 17.876 7.402c4.945 4.945 7.431 10.854 7.431 17.788 0 6.905-2.457 12.786-7.431 17.613zM321.038 232.506c-5.705 8.923-13.283 16.735-22.791 23.464l-12.99 9.128c-5.5 3.979-9.714 8.455-12.668 13.37-2.955 4.945-4.447 10.649-4.447 17.145v1.901h-34.202c-0.439-2.106-0.731-4.184-0.936-6.291s-0.321-4.301-0.321-6.612c0-8.397 1.901-16.413 5.705-24.079s10.24-14.834 19.309-21.563l15.185-11.322c9.070-6.7 13.605-15.009 13.605-24.869 0-3.57-0.644-7.080-1.901-10.533s-3.219-6.495-5.851-9.128c-2.633-2.633-5.969-4.71-9.977-6.291s-8.66-2.369-13.927-2.369c-5.705 0-10.561 1.054-14.571 3.16s-7.343 4.769-9.977 8.017c-2.633 3.247-4.594 7.022-5.851 11.322s-1.901 8.66-1.901 13.049c0 4.213 0.41 7.548 1.258 10.065l-39.877-1.58c-0.644-2.311-1.054-4.652-1.258-7.080-0.205-2.399-0.321-4.769-0.321-7.080 0-8.397 1.58-16.619 4.74-24.693s7.812-15.214 13.927-21.416c6.114-6.173 13.663-11.176 22.645-14.951s19.368-5.676 31.188-5.676c12.229 0 22.996 1.785 32.3 5.355 9.274 3.57 17.087 8.25 23.435 14.014 6.319 5.764 11.089 12.434 14.248 19.982s4.74 15.331 4.74 23.289c0.058 12.581-2.809 23.347-8.514 32.27z"></path>' +
						'</svg>' +
					'</span>' +
					'<span class="taglib-text hide-accessible">' +
						helpMessage +
					'</span>' +
				'</span>';

			return $(html);
		},
		$getLabelNode: function( controlName, label, mandatory, helpMessage ){
			let $label = $( '<label class="control-label" for="' + controlName + '">' ); +
			$label.text( label );

			if( mandatory ){
				$label.append( this.$getRequiredLabelMark( 'margin-left:4px; margin-right:2px;' ) );
			}

			if( helpMessage ){
				$label.append( this.$getHelpMessageLabelMark(helpMessage, 'margin-left:2px;') );
			}

			return $label;
		},
		$getTextInputTag: function( inputType, termName, controlName, placeHolder, value ){
			let $input;
			
			if( inputType === 'text'){
				$input = $( '<input type="text" aria-required="true">' )
							.text( value );
			}
			else{
				$input = $( '<textarea aria-required="true">' )
							.prop( 'value', value ? value : '' );
			}

			$input.prop({
				class: 'field form-control',
				id: controlName,
				name: controlName,
				placeholder: placeHolder ? placeHolder : ''
			});

			$input.change(function(event){
				event.stopPropagation();

				let eventData = {
					sxeventData:{
						sourcePortlet: NAMESPACE,
						targetPortlet: NAMESPACE,
						termName: termName,
						valueMode: 'single',
						changedValue: $(this).val()  
					}
				};

				Liferay.fire(
					SXIcecapEvents.DATATYPE_SDE_VALUE_CHANGED,
					eventData
				);
			});

			return $input;
		},
		$getSelectTag: function( termName, controlName, options, value ){
			let $select = $( '<select class="form-control" id="' + controlName + '" name="' + controlName + '">' );

			options.forEach( (option)=>{
				let $option = $( '<option>' );
				
				$option.prop('value', option.value);

				if( option.selected === true || option.value === value ){
					$option.prop( 'checked', true );
				};

				$option.text(option.labelMap[CURRENT_LANGUAGE]);

				$select.append( $option );
			});

			$select.change(function(event){
				event.stopPropagation();

				let eventData = {
					sxeventData:{
						sourcePortlet: NAMESPACE,
						targetPortlet: NAMESPACE,
						termName: termName,
						valueMode: 'single',
						changedValue: $(this).val()  
					}
				};

				Liferay.fire(
					SXIcecapEvents.DATATYPE_SDE_VALUE_CHANGED,
					eventData
				);
			});

			return $select;
		},
		$getRadioButtonTag: function (controlId, controlName, label, selected, value ){
			let $label = $( '<label>' );
			let $input = $( '<input type="radio">')
									.prop({
										class: "field",
										id: controlId,
										name: controlName,
										value: value,
										checked: selected
									});
			
			$label.prop('for', controlId )
				  .append( $input )
				  .append( label );

  			let $radio = $( '<div class="radio" style="display:inline-block; margin-left:10px; margin-right:10px;">' )
							.append( $label );

			return $radio;
		},
		$getCheckboxTag: function( controlId, controlName, label, checked, value, disabled ){
			
			let $label = $( '<label>' )
							.prop( 'for', controlId );
			
			let $input = $( '<input type="checkbox" style="margin-right:10px;">');
			$input.prop({
				class: "field",
				id: controlId,
				name: controlName,
				value: value,
				checked: checked,
				disabled: disabled
			});
			
			$label.append( $input )
				  .append( label );

			let $checkbox = $( '<div class="checkbox" style="display:inline-block;margin-left:10px;margin-right:20px;">' )
								.append( $label );
			
			return $checkbox;
		},
		$getSelectFieldsetNode: function( termName, controlName, displayStyle, label, mandatory, helpMessage, options, value){
			let $node;

			let $label = this.$getLabelNode( controlName, label, mandatory, helpMessage );
			if( displayStyle === SXConstants.DISPLAY_STYLE_SELECT ){
				
				$node = $('<div class="form-group input-text-wrapper">')
									.append( $label )
									.append( this.$getSelectTag(termName, controlName, options, value) );
			}
			else{
				let $panelTitle = $('<div class="form-group input-text-wrapper control-label panel-title" id="' + controlName + 'Title">')
										.append($label);

				let $fieldsetHeader = $('<div class="panel-heading" id="' + controlName + 'Header" role="presentation">')
									.append( $panelTitle );

				let $panelBody = $('<div class="panel-body">').css('padding', '0 20px 0.75rem 10px');

				let $fieldsetContent = $('<div aria-labelledby="' + controlName + 'Header" class="in  " id="' + controlName + 'Content" role="presentation">')
										.append($panelBody);
				let $fieldSet = $('<fieldset aria-labelledby="' + controlName + 'Title" role="group">')
									.append( $fieldsetHeader )
									.append($fieldsetContent);


				let $panelGroup = $('<div aria-multiselectable="true" class="panel-group" role="tablist">')
									.append( $fieldSet );


				if( displayStyle === SXConstants.DISPLAY_STYLE_RADIO ){
					options.forEach((option, index)=>{
							$panelBody.append( this.$getRadioButtonTag( 
														controlName+'_'+(index+1),
														controlName, 
														option.labelMap[CURRENT_LANGUAGE],
														option.selected || value === option.value,
														option.value,
														value ) );

					});

					$panelBody.change(function(event){
						event.stopPropagation();

						let changedVal = $(this).find('input[type="radio"]:checked').val();

						let eventData = {
							sxeventData:{
								sourcePortlet: NAMESPACE,
								targetPortlet: NAMESPACE,
								termName: termName,
								valueMode: 'single',
								changedValue: changedVal
							}
						};

						Liferay.fire(
							SXIcecapEvents.DATATYPE_SDE_VALUE_CHANGED,
							eventData
						);
					});
				}
				else{
					options.forEach((option, index)=>{
							$panelBody.append( this.$getCheckboxTag( 
														controlName+'_'+(index+1),
														controlName,
														option.labelMap[CURRENT_LANGUAGE],
														option.selected || value === option.value,
														option.value,
														value,
														false ) );
					});
						
					$panelBody.change(function(event){
						event.stopPropagation();

						let checkedValues = new Array();

						$.each( $(this).find('input[type="checkbox"]:checked'), function(){
							checkedValues.push( $(this).val() );
						});

						let eventData = {
							sxeventData:{
								sourcePortlet: NAMESPACE,
								targetPortlet: NAMESPACE,
								termName: termName,
								valueMode: 'multiple',
								changedValue: checkedValues
							}
						};

						Liferay.fire(
							SXIcecapEvents.DATATYPE_SDE_VALUE_CHANGED,
							eventData
						);
					});
				}

				$node = $('<div class="card-horizontal main-content-card">')
								.append( $panelGroup );
			}

			return $node;
		},
		$getTextInputNode: function(termName, inputType, label, placeHolder, mandatory, helpMessage, value ){
			let controlName = NAMESPACE + termName;

			let $node = $('<div class="form-group input-text-wrapper">')
							.append( this.$getLabelNode(controlName, label, mandatory, helpMessage) )
							.append(this.$getTextInputTag(inputType, termName, controlName, placeHolder, value));

			
			return $node;
		},
		$getPreviewRemoveButtonNode: function( termName, iconClass ){
			let $button = $( '<button type="button" class="btn btn-default">' +
								'<i class="' + iconClass + '" />' +
							 '</button>' );

			let eventData = {
					sxeventData:{
						sourcePortlet: NAMESPACE,
						targetPortlet: NAMESPACE,
						termName: termName
					}
				};
			
			
			$button.click(function(event){
				event.stopPropagation();

				$('<div>Remove from group or delete from data structure?</div>').dialog({
					autoOpen: true,
					title:'',
					modal: true,
					draggable: true,
					buttons:[
						{
							text: 'Remove',
							click: function(){
								$(this).dialog('destroy');
								Liferay.fire(
									SXIcecapEvents.DATATYPE_PREVIEW_REMOVE_TERM,
									eventData
								);
							}
						},
						{
							text: 'Delete',
							click: function(){
								Liferay.fire(
									SXIcecapEvents.DATATYPE_PREVIEW_DELETE_TERM,
									eventData
								);
								$(this).dialog('destroy');
							}
						},
						{
							text: 'Cancel',
							click:function(){
								$(this).dialog('destroy');
							}
						}
					]
				});

				
			});

			return $button;
		},
		$getPreviewRowSection: function( termName, $inputSection ){
			let trRowClass = NAMESPACE + termName;

			let $inputTd = $('<td style="width:90%;">').append( $inputSection );

			let $buttonTd = $('<td style="padding-right:0;">')
								.append( this.$getPreviewRemoveButtonNode( termName, 'icon-remove' ) );

			let $previewRow = $('<tr>')
									.addClass( trRowClass )
									.append( $inputTd )
									.append( $buttonTd );
			
			$previewRow.click( function( event ){
				event.stopPropagation();
				// Change the previous highlighted border to normal 
				$panel.find('.highlight-border').each( function(){
					$(this).removeClass('highlight-border');
				});
				
				const eventData = {
					sxeventData:{
						sourcePortlet: NAMESPACE,
						targetPortlet: NAMESPACE,
						selectedTerm: term
					}
				};
				
				Liferay.fire( SXIcecapEvents.DATATYPE_PREVIEW_TERM_SELECTED, eventData );
				
				$(this).addClass('highlight-border');
			});

			return $previewRow;
		},
		$getEditorRowSection: function( termName, $inputSection ){
			let $inputTd = $('<td style="width:100%;">').append( $inputSection );

			let $row = $('<tr>')
									.append( $inputTd );

			return $row;
		},
		$getFormStringSection: function( 
					termName, 
					inputType, 
					label, 
					placeHolder, 
					helpMessage, 
					mandatory, 
					value, 
					forWhat, 
					highlight ){

			let $textInput = this.$getTextInputNode( termName, inputType, label, placeHolder, mandatory, helpMessage, value );

			let $String;
			if( forWhat === SXConstants.FOR_PREVIEW ){
				$String = this.$getPreviewRowSection( termName, $textInput );
			}
			else{
				$String = this.$getEditorRowSection( termName, $textInput );
			}

			if( highlight ){
				$String.addClass(highlight);
			}
			
			return $String;
		},
		$getFormNumericSection: function(
			termName, 
			label, 
			helpMessage, 
			mandatory, 
			value,
			minValue,
			minBoundary,
			maxValue,
			maxBoundary,
			unit,
			uncertainty,
			uncertaintyValue,
			forWhat, 
			highlight ){

			let controlName = NAMESPACE + termName;

			let $viewCol = $('<td>');
			
			if( forWhat === SXConstants.FOR_PREVIEW ){
				$viewCol.css('width', '90%');
			}
			else{
				$viewCol.css('width', '100%');
			}
			
			let $label = this.$getLabelNode( controlName, label, mandatory, helpMessage );
			$viewCol.append( $label );
			
			let $controlSection = $('<div style="display:flex; align-items:center;justify-content: center; width:100%; margin:0; padding:0;">');
			$viewCol.append( $controlSection );

			let valueRate = 100;
			if( minValue ){
				let $minValueCol = $('<div style="display:inline-block;min-width:3%;text-align:center;"><strong>' +
				minValue +
				'</strong></div>');
				$controlSection.append( $minValueCol );
				valueRate = 95;
				
				let minBoundaryText = '&lt;';
				if( minBoundary ){
					minBoundaryText = '&le;';
				}

				let $minBoundaryCol = '<div style="display:inline-block;min-width:3%;text-align:center;margin-right:5px;"><strong>' +
				minBoundaryText +
				'</strong></div>';
				$controlSection.append( $minBoundaryCol );

				valueRate = 90;
			}
			
			let $textInput = this.$getTextInputTag( 'text', termName, controlName, '', value );
			let $inputcol = $('<div style="display:inline-block; width:100%;">').append($textInput);
			$controlSection.append( $inputcol );
			
			if( uncertainty ){
				let $uncertaintyOp = $('<div style="display:inline-block;min-width:3%;text-align:center;margin:0 5px 0 5px;"><strong>&#xB1;</strong></div>');
				$controlSection.append( $uncertaintyOp );

				let $uncertaintyInput = this.$getTextInputTag( 'text', termName, controlName+'_uncertainty', '', value );
				let $inputcol = $('<div style="display:inline-block; max-width:40%;">').append($uncertaintyInput);
				$controlSection.append( $inputcol );
			}

			if( unit ){
				let $unit = $('<div style="display:inline-block;min-width:3%;text-align:center;margin:1rem 10px 0 10px;">' +
								unit +
							'</div>');
				$controlSection.append( $unit );
			}

			if( maxValue ){
				
				let maxBoundaryText = '&lt;';
				if( maxBoundary ){
					maxBoundaryText = '&le;';
				}
				
				let $maxBoundaryCol = '<div style="display:inline-block;min-width:3%;text-align:center;margin:0 2px 0 2px;"><strong>' +
				maxBoundaryText +
				'</strong></div>';

				let $maxValueCol = $('<div style="display:inline-block;min-width:3%;text-align:center;"><strong>' +
				maxValue +
				'</strong></div>');
				
				$controlSection.append( $maxBoundaryCol );
				$controlSection.append( $maxValueCol );
			}
			
			let trRowClass = NAMESPACE + termName;
			let $Numeric = $('<tr>')
					.addClass( trRowClass )
					.append( $viewCol );

			if( forWhat === SXConstants.FOR_PREVIEW ){
				let $buttonCol = $('<td style="padding-right:0;">')
										.append( this.$getPreviewRemoveButtonNode( termName, 'icon-remove' ) );
				$Numeric.append( $buttonCol );
				
			}

			if( highlight ){
				$Numeric.addClass( highlight );
			}

			return $Numeric;

		},
		$getFormListSection: function(
				termName,
				label, 
				helpMessage, 
				mandatory, 
				value,
				displayStyle,
				options,
				dependentTerms,
				forWhat, 
				highlight ){
			let controlName = NAMESPACE + termName;

			let $fieldset = this.$getSelectFieldsetNode( termName, controlName, displayStyle, label, mandatory, helpMessage, options, value );
			
			let $List;
			if( forWhat === SXConstants.FOR_PREVIEW ){
				$List = this.$getPreviewRowSection(termName, $fieldset);
			}
			else{
				$List = this.$getEditorRowSection(termName, $fieldset);
			}

			if( highlight ){
				$List.addClass(highlight);
			}

			return $List;
		},
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
			if( !activeTermNames ){
				activeTermNames = new Array();
			}
			
			return activeTermNames;
		},
		setFormCheckedArray: function( attrName, values ){
			$.makeArray( $( 'input[type="checkbox"][name="'+NAMESPACE+attrName+'"]' ) ).forEach((checkbox)=>{
				if( values && values.includes( $(checkbox).val() ) ){
					$(checkbox).prop( 'checked', true );
				}
				else{
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
		DATATYPE_PREVIEW_REMOVE_TERM: 'DATATYPE_PREVIEW_REMOVE_TERM',
		DATATYPE_PREVIEW_TERM_SELECTED: 'DATATYPE_PREVIEW_TERM_SELECTED',
		DATATYPE_FORM_UI_SHOW_TERMS: 'DATATYPE_FORM_UI_SHOW_TERMS',
		DATATYPE_ACTIVE_TERM_CHANGED: 'DATATYPE_ACTIVE_TERM_CHANGED',
		DATATYPE_FORM_UI_CHECKBOX_CHANGED: 'DATATYPE_FORM_UI_CHECKBOX_CHANGED',
		LIST_OPTION_ACTIVE_TERM_DELETED: 'LIST_OPTION_ACTIVE_TERM_REMOVED',
		LIST_OPTION_ACTIVE_TERM_SELECTED: 'LIST_OPTION_ACTIVE_TERM_SELECTED',
		LIST_OPTION_PREVIEW_REMOVED: 'LIST_OPTION_PREVIEW_REMOVED',
		LIST_OPTION_PREVIEW_SELECTED: 'LIST_OPTION_PREVIEW_SELECTED',
		LIST_OPTION_ACTIVE_TERMS_CHANGED:'LIST_OPTION_ACTIVE_TERMS_CHANGED',

		DATATYPE_SDE_VALUE_CHANGED: 'DATATYPE_SDE_VALUE_CHANGED',
		DATATYPE_SDE_UNCERTAINTY_CHANGED: 'DATATYPE_SDE_UNCERTAINTY_CHANGED'
	};

	const SXConstants = {
		FOR_PREVIEW: true,
		FOR_EDITOR: false,

		DISPLAY_STYLE_SELECT: 'select',
		DISPLAY_STYLE_RADIO: 'radio',
		DISPLAY_STYLE_CHECK: 'check',

		STOP_EVERY: false,
		CONTINUE_EVERY: true,

		FILTER_SKIP: false,
		FILTER_ADD: true,

		FAIL: false,
		SUCCESS: true,

		SINGLE: false,
		ARRAY: true
	};
	
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
					sxeventData:{
						sourcePortlet: NAMESPACE,
						targetPortlet: NAMESPACE,
						removedOption: self
					}
				};

				Liferay.fire( SXIcecapEvents.LIST_OPTION_PREVIEW_REMOVED, eventData );
			});

			$row.click(function(event){
				event.stopPropagation();

				let eventData = {
					sxeventData:{
						sourcePortlet: NAMESPACE,
						targetPortlet: NAMESPACE,
						highlightedOption: self
					}
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
						sxeventData:{
							sourcePortlet: NAMESPACE,
							targetPortlet: NAMESPACE,
							deletedTerm: term
						}
					}

					Liferay.fire( SXIcecapEvents.LIST_OPTION_ACTIVE_TERM_REMOVED, eventData );
				});

				$row.click(function(event){
					event.stopPropagation(); 
					
					$previewPanel.find('.highlight-border').removeClass('highlight-border');
					$row.addClass('highlight-border');
					
					let eventData = {
						sxeventData:{
							sourcePortlet: NAMESPACE,
							targetPortlet: NAMESPACE,
							selectedTerm: term
						}
					}

					Liferay.fire( SXIcecapEvents.LIST_OPTION_ACTIVE_TERM_SELECTED, eventData );
				});
				
				$previewPanel.append( $row );
			});
		}

		toJSON(){
			let json = new Object();

			json.value = this.value;
			json.labelMap = this.labelMap;
			if( this.selected ){
				json.selected = true;
			}
			if( !Util.isEmptyArray( this.activeTerms ) ){
				json.activeTerms = this.activeTerms;
			}

			return json;
		}
	}

	class Term {
		static DEFAULT_TERM_ID = 0;
		static DEFAULT_TERM_VERSION = '1.0.0';
		static DEFAULT_MANDATORY = false;
		static DEFAULT_MIN_LENGTH = 1;
		static DEFAULT_VALUE_MODE = SXConstants.SINGLE;

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
			
			let validationPassed = true;
			
			// Check valid format
			if( updatedParts.length !== 3 )		return false;
			
			updatedParts.every((part)=>{
				
				let int = Number(part); 
				
				if( Number.isInteger(int) ){
					return SXConstants.CONTINUE_EVERY;
				}
				else{
					validationPassed = SXConstants.FAIL;
					return SXConstants.STOP_EVERY;
				}
			});
			
			if( !validationPassed )		return false;
			
			// updated version should be bigger than previous versison
			if( previous ){
				
				let previousParts = previous.split('.');
				
				if( Number(updatedParts[0]) < Number(previousParts[0]) ){
					validationPassed = false;
				}
				else if( Number(updatedParts[1]) < Number(previousParts[1]) ){
					validationPassed = false;
				}
				else if( Number(updatedParts[2]) <= Number(previousParts[2]) ){
					validationPassed = false;
				}
			}
			
			return validationPassed;
		}

		
		constructor( termType ){
			this.termId = 0;
			this.termType = termType;
		}

		isGroupTerm(){
			return this.termType === TermTypes.GROUP;
		}

		isInTermSet( termName ){
			if( !this.termSet || this.termSet.length === 0 ){
				return false;
			}

			return this.termSet.includes( termName );
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
					return SXConstants.STOP_EVERY;
				}
				
				return SXConstants.CONTINUE_EVERY;
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
			
			json.status = this.status;
			json.state = this.state;
			
			return json;
		}
		
		parse( json ){
			let unparsed = {};
			
			let self = this;
			Object.keys( json ).forEach(function(key, index){
				switch( key ){
					case 'termType':
						self.termType = json.termType;
						break; 
					case 'termName':
					case 'termVersion':
					case 'synonyms':
					case 'mandatory':
					case 'value':
					case 'active':
					case 'order':
					case 'state':
						self[key] = json[key];
						break;
					case 'displayName':
					case 'definition':
					case 'tooltip':
						self[key] = new LocalizedObject(); 
						self[key].setLocalizedMap( json[key] );
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

		initAllAttributes(){
			this.termName = '';
			this.termVersion = Term.DEFAULT_TERM_VERSION;
			this.displayName = null;
			this.definition = null;
			this.tooltip = null;
			this.synonyms = null;
			this.mandatory = Term.DEFAULT_MANDATORY;
			this.value = null;
			this.valueMode = Term.DEFAULT_VALUE_MODE;
			this.status = Term.STATUS_DRAFT;
			this.state = Term.STATE_INIT;
		}
		
	} // End of Term
	
	/* 1. String */
	class StringTerm extends Term {
		static DEFAULT_MIN_LENGTH = 1;
		static DEFAULT_MAX_LENGTH = 72;
		static DEFAULT_MULTIPLE_LINE = false;
		static DEFAULT_VALIDATION_RULE = '^[\w\s!@#\$%\^\&*\)\(+=._-]*$';
		
		constructor( jsonObj ){
			super( 'String' );

			jsonObj ? this.parse( jsonObj ) : this.initAllAttributes();

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

			console.log( 'unparsed: ', unparsed );
			let unvalid = new Object();
			
			let self = this;
			Object.keys( unparsed ).forEach( (key, index) => {
				switch( key ){
					case 'minLength':
					case 'maxLength':
					case 'multipleLine':
					case 'validationRule':
						self[key] = unparsed[key];
						break;
					case 'placeHolder':
						self.placeHolder = new LocalizedObject( unparsed[key] );
						break;
					default:
						console.log('Un-identified Attribute: '+key);
						unvalid[key] = unparsed[key];
				}
			});

			console.log( 'self: ', self );
			console.log( 'unvalid: ', unvalid );
			
			return unvalid;
		}
		
		/**
		 * Render term UI for preview
		 */
		$render( forWhat, highlight ){
			return FormUIUtil.$getFormStringSection(
				this.termName,
				this.multipleLine ? 'textarea' : 'text',
				this.getLocalizedDisplayName(),
				this.getLocalizedPlaceHolder() ? this.getLocalizedPlaceHolder() : '',
				this.getLocalizedTooltip() ? this.getLocalizedTooltip() : '',
				this.mandatory ? this.mandatory : false,
				this.value ? this.value : '',
				forWhat,
				highlight
			);
		}

		$render_Freemarker( renderInputUrl, forWhat ){
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
			
			this.setPlaceHolderFormValue();
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
		constructor( jsonObj ){
			super('Numeric');

			jsonObj ? this.parse( jsonObj ) : this.initAllAttributes();
			
			this.setAllFormValues();
		}

		removeActiveTerm( termName ){
			return null;
		} 
		
		$render( forWhat, highlight ){
			return FormUIUtil.$getFormNumericSection( 
										this.termName,
										this.getLocalizedDisplayName(),
										this.getLocalizedTooltip() ? this.getLocalizedTooltip() : '',
										this.mandatory ? this.mandatory : false,
										this.value ? this.value : '',
										this.minValue ? this.minValue : '',
										this.minBoundary ? this.minBoundary : false,
										this.maxValue ? this.maxValue : '',
										this.maxBoundary ? this.maxBoundary : false,
										this.unit ? this.unit : '',
										this.uncertainty ? this.uncertainty : false,
										this.uncertaintyValue ? this.uncertaintyValue : '',
										forWhat,
										highlight);
		}

		$render_Freemarker( renderInputUrl, forWhat ){
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
			let unparsed = super.parse( json );
			let invalid = new Object();

			console.log( 'unparsed: ', json, unparsed );
			let self = this;
			Object.keys( unparsed ).forEach((key, index)=>{
				switch( key ){
					case 'minValue':
					case 'minBoundary':
					case 'maxValue':
					case 'maxBoundary':
					case 'unit':
					case 'uncertainty':
					case 'sweepable':
						self[key] = json[key];
						break;
					default:
						invalid[key] = json[key];
				}
			});

			console.log('Numeric Term: ', this);
		}
		
		toJSON(){
			let json = super.toJSON();
			
			if( this.minValue )	json.minValue = this.minValue;
			if( this.minBoundary )	json.minBoundary = true;
			if( this.manValue )	json.manValue = this.manValue;
			if( this.manBoundary )	json.manBoundary = true;
			if( this.unit )	json.unit = this.unit;
			if( this.uncertainty )	json.uncertainty = true;
			if( this.sweepable )	json.sweepable = true;
			
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
		static $BTN_CHOOSE_ACTIVE_TERMS = $('#'+NAMESPACE+'btnListChooseActiveTerms');

		constructor( jsonObj ){
			super('List');

			jsonObj ? this.parse(jsonObj) : this.initAllAttributes();

			this.setAllFormValues();
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
		addOption( option ){
			let optionLabelMap;
			let optionValue;
			let selected;
			let activeTerms;

			if( option ){
				optionLabelMap = option.labelMap;
				optionValue = option.value;
				selected = option.selected;
				activeTerms = option.activeTerms;
			}
			else{
				optionLabelMap = this.getOptionLabelFormValue();
				optionValue = this.getOptionValueFormValue();
				selected = this.getOptionSelectedFormValue();
				activeTerms = new Array();

				if( !optionLabelMap || 
					Object.keys(optionLabelMap).length === 0 ||
					!optionValue ){
					$.alert( 'Option Label and Option Value are required.' );
					return null;
				}
			}

			if( selected === true ){
				this.clearSelectedOption();
			}

			let newOption = new ListOption( optionLabelMap, optionValue, selected, new Array() );

			this.options.push(newOption);

			let $row = newOption.$renderPreview();

			ListTerm.$OPTION_TABLE.append( $row ); 

			this.highlightedOption = newOption;

			this.highlightOptionPreview();

			return this.highlightedOption;
		}

		getHighlightedOption(){
			return this.highlightedOption;
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
						}

						return false;
					}

					return true;
				});
			
			this.initOptionFormValues(this.highlightedOption);

			if( this.options.length === 0 ){
				ListTerm.$BTN_ADD_OPTION.prop('disabled', false );
			}

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
					
					return SXConstants.STOP_EVERY;
				}

				return SXConstants.CONTINUE_EVERY;
			})
		}

		renderOptions(){
			let $panel = ListTerm.$OPTION_TABLE;
			$panel.empty();

			this.options.forEach((option)=>{
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

		$render( forWhat, highlight ){
			this.updateDependentTerms();
			
			let options = new Array();
			this.options.forEach((option)=>{
				let rOption = {};

				rOption.label = option.labelMap[CURRENT_LANGUAGE];
				rOption.value = option.value;
				rOption.selected = option.selected;
				rOption.activeTerms = option.activeTerms;
				rOption.inactiveTerms = this.dependentTerms.filter((termName)=>!option.activeTerms.includes(termName));

				options.push( rOption );
			});

			return FormUIUtil.$getFormListSection(
									this.termName,
									this.getLocalizedDisplayName(),
									this.getLocalizedTooltip() ? this.getLocalizedTooltip() : '',
									this.mandatory ? this.mandatory : false,
									this.value ? this.value : '',
									this.displayStyle,
									this.options,
									this.dependentTerms,
									forWhat,
									highlight );
		}

		$render_Freemarker( renderInputUrl, forWhat ){
			this.updateDependentTerms();
			
			let options = new Array();
			this.options.forEach((option)=>{
				let rOption = {};

				rOption.label = option.labelMap[CURRENT_LANGUAGE];
				rOption.value = option.value;
				rOption.selected = option.selected;
				rOption.activeTerms = option.activeTerms;
				rOption.inactiveTerms = this.dependentTerms.filter((termName)=>!option.activeTerms.includes(termName));

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
			this.displayStyle = 'select';
			this.dependentTerms = new Array();

			ListTerm.$OPTION_TABLE.empty();
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

		setAllFormValues(){
			super.setAllFormValues();
			this.initOptionFormValues();
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
			let unparsed = super.parse( json );
			let unvalid = new Object();

			let self = this;
			Object.keys( unparsed ).forEach((key)=>{
				switch(key){
					case 'displayStyle':
					case 'dependentTerms':
						self[key] = json[key];
						break;
					case 'options':
						self.options = new Array();
						json.options.forEach(option => self.addOption(option));
						break;
					default:
						unvalid[key] = json[key];
						console.log('Unvalid term attribute: '+key, json[key]);
				}
			});

			console.log('List Term: ', self);
		}
		
		toJSON(){
			let json = super.toJSON();
			
			json.displayStyle = this.displayStyle;
			json.options = this.options.map(option=>option.toJSON());
			
			return json;
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
		static $BTN_CHOOSE_GROUP_TERMS = $('#'+NAMESPACE+'btnChooseGroupTerms');

		constructor( jsonObj ){
			super('Group');

			if( jsonObj ){
				this.parse(jsonObj);
			}
			else{
				this.termSet = new Array();
			}
		}

		getTermSet(){
			return this.termSet();
		}

		setTermSet( termSet ){
			this.termSet = termSet;
		}

		getTerm( termName ){
			let searchedTerm = null;

			this.termSet.every(term=>{
				if( term.isGroupTerm() ){
					searchedTerm = term.getTerm( term.termName );
					if( searchedTerm ){
						return SXConstants.STOP_EVERY;
					}
				}
				else if( termName === term.terName ){
					searchedTerm = term;
					return SXConstants.STOP_EVERY;
				}

				return SXConstants.CONTINUE_EVERY;
			});

			return searchedTerm;
		}

		getGroupBodyId(){
			return NAMESPACE + this.termName + '_GroupBody';
		}

		removeTerm( termName ){
			let removedTerm = null;

			this.termSet = this.termSet.filter(term=>{
				if( term.isGroupTerm() ){
					removedTerm = term.removeTerm(termName);
					if( removedTerm ){
						return SXConstants.FILTER_SKIP;
					}
				}
				else{
					if( term.termName === termName ){
						removedTerm = term;
						return SXConstants.FILTER_SKIP;
					}
				}

				return SXConstants.FILTER_ADD;	
			});

			return removedTerm;
		}

		$render( forWhat, highlight ){
			if( Util.isEmptyArray(this.termSet) ){
				return null;
			}

			let $tbody = $('<tbody id="' + this.getGroupBodyId() + '">');
			let $groupTable = $('<table>').append( $tbody );
			let $groupHead = $('<h3>').text(this.displayName.getText(CURRENT_LANGUAGE));
			let $accordion = $('<div>').accordion({
				collapsible: true
			}).append($groupHead).append($groupTable);
			
			$tbody.append(this.termSet.map(term=>term.$render(forWhat, '')));

			if( forWhat === SXConstants.FOR_PREVIEW ){
				return FormUIUtil.$getPreviewRowSection(this.termName, $accordion).addClass(highlight);
			}
			else{
				return FormUIUtil.$getEditorRowSection(this.termName, $accordion);
			}
		}

		parse( jsonObj ){
			let unparsed = super.parse( jsonObj );
			let unvalid = new Array();

			let self = this;
			Object.keys(unparsed).forEach( key => {
				if( key === 'termSet'){
					self.termSet = jsonObj.termSet.map( jsonTerm => TermTypes.CREATE_TERM( jsonTerm ) );
				}
			});
		}

		toJSON(){

		}
	}



	/* 19. BooleanTerm */
	class BooleanTerm extends Term {
		static ID_DISPLAY_STYLE = 'booleanDisplayStyle';
		static ID_TRUE_LABEL = 'booleanTrueLabel';
		static ID_FALSE_LABEL = 'booleanFalseLabel';
		static $DISPLAY_STYLE = $('#'+NAMESPACE+BooleanTerm.ID_DISPLAY_STYLE);
		static $TRUE_LABEL = $('#'+NAMESPACE+BooleanTerm.ID_TRUE_LABEL);
		static $FALSE_LABEL = $('#'+NAMESPACE+BooleanTerm.ID_FALSE_LABEL);
		static $TRUE_ACTIVE_TERMS_BUTTON = $('#'+NAMESPACE+'btnBooleanTrueActiveTerms');
		static $FALSE_ACTIVE_TERMS_BUTTON = $('#'+NAMESPACE+'btnBooleanFalseActiveTerms');

		static DEFAULT_DISPLAY_STYLE = SXConstants.DISPLAY_STYLE_SELECT;
		static AVAILABLE_TERMS = null;

		static OPTION_FOR_TRUE = 0;
		static OPTION_FOR_FALSE = 1;

		constructor( jsonObj ){
			super('Boolean');

			jsonObj ? this.parse(jsonObj) : this.initAllAttributes();

			this.setAllFormValues();
		}

		initAllAttributes(){
			console.log('Init all attrs: ', this);
			super.initAllAttributes('Boolean');
			this.displayStyle = BooleanTerm.DEFAULT_DISPLAY_STYLE;
			this.options = new Array();

			// for true
			this.options.push( new ListOption( {'en_US':'Yes'}, true, true, [] ) );

			// for false
			this.options.push( new ListOption( {'en_US':'No'}, false, false, [] ) );
			this.dependentTerms = null;
		}

		updateDependentTerms(){
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

		getTrueOption(){
			return this.options[BooleanTerm.OPTION_FOR_TRUE];
		}

		getFalseOption(){
			return this.options[BooleanTerm.OPTION_FOR_FALSE]
		}

		$render( forWhat, highlight ){
			this.updateDependentTerms();
			
			let options = new Array();
			this.options.forEach((option)=>{
				let rOption = {};

				rOption.label = option.labelMap[CURRENT_LANGUAGE];
				rOption.value = option.value;
				rOption.selected = option.selected;
				rOption.activeTerms = option.activeTerms;
				rOption.inactiveTerms = this.dependentTerms.filter((termName)=>!option.activeTerms.includes(termName));

				options.push( rOption );
			});

			return FormUIUtil.$getFormListSection(
									this.termName,
									this.getLocalizedDisplayName(),
									this.getLocalizedTooltip() ? this.getLocalizedTooltip() : '',
									this.mandatory ? this.mandatory : false,
									this.value ? this.value : '',
									this.displayStyle,
									this.options,
									this.dependentTerms,
									forWhat,
									highlight );
		}


		getDisplayStyleFormValue ( save ){
			let value = FormUIUtil.getFormRadioValue( BooleanTerm.ID_DISPLAY_STYLE );
			if( save ){
				this.displayStyle = value;
			}
			
			return value;
		}
		setDisplayStyleFormValue ( value ){
			if( value ){
				FormUIUtil.setFormRadioValue( BooleanTerm.ID_DISPLAY_STYLE, value );
			}
			else if( this.displayStyle ){
				FormUIUtil.setFormRadioValue( BooleanTerm.ID_DISPLAY_STYLE, this.displayStyle );
			}
			else{
				FormUIUtil.setFormRadioValue( BooleanTerm.ID_DISPLAY_STYLE );
			}
		}

		getTrueLabelFormValue (){
			let trueOption = this.options[0];
			trueOption.setLabelMap(FormUIUtil.getFormLocalizedValue( BooleanTerm.ID_TRUE_LABEL ));
			return trueOption.getLabelMap();
		}
		setTrueLabelFormValue ( valueMap ){
			let trueOption = this.options[0];

			if( valueMap ){
				FormUIUtil.setFormLocalizedValue( BooleanTerm.ID_TRUE_LABEL, valueMap );
			}
			else{
				FormUIUtil.setFormLocalizedValue( BooleanTerm.ID_TRUE_LABEL, trueOption.getLabelMap() );
			}
		}

		getFalseLabelFormValue (){
			let falseOption = this.options[1];
			falseOption.setLabelMap(FormUIUtil.getFormLocalizedValue( BooleanTerm.ID_FALSE_LABEL ));
			return falseOption.getLabelMap();
		}
		setFalseLabelFormValue ( valueMap ){
			let falseOption = this.options[1];

			if( valueMap ){
				FormUIUtil.setFormLocalizedValue( BooleanTerm.ID_FALSE_LABEL, valueMap );
			}
			else{
				FormUIUtil.setFormLocalizedValue( BooleanTerm.ID_FALSE_LABEL, falseOption.getLabelMap() );
			}
		}

		setAllFormValues(){
			super.setAllFormValues();
			this.initOptionFormValues();
		}

		initOptionFormValues(){
			this.setDisplayStyleFormValue();
			this.setTrueLabelFormValue();
			this.setFalseLabelFormValue();
		}

		toJSON(){
			let json = super.toJSON();

			json.displayStyle = this.displayStyle;
			json.options = this.options.map(option=>option.toJSON());

			return json;
		}

		parse( jsonObj ){
			let unparsed = super.parse( jsonObj );
			let unvalid = new Array();

			let self = this;
			Object.keys(unparsed).forEach( key => {
				switch(key){
					case 'displayStyle':
						self.displayStyle = jsonObj.displayStyle;
						break;
					case 'options':
						self.options = new Array();
						jsonObj.options.forEach( option => {
							self.options.push( new ListOption(
								option.labelMap,
								option.value,
								option.selected,
								option.activeTerms
							));
						});
						break;
					default:
						unvalid[key] = json[key];
						console.log('[BooleanTerm] Unvalid term attribute: '+key, json[key]);
						break;
				}
			});
		}
	}
	
	/* 20. IntergerTerm */
	class IntegerTerm extends NumericTerm{
		constructor(){
			
		}
	}

	class DataStructure {
		static $PREVIEW_PANEL = $('#'+NAMESPACE+'previewPanel');
		static $TERM_DELIMITER_FORM_CTRL = $('#'+NAMESPACE+'termDelimiter');
		static $TERM_DELIMITER_POSITION_FORM_CTRL = $('#'+NAMESPACE+'termDelimiterPosition');
		static $TERM_VALUE_DELIMITER_FORM_CTRL = $('#'+NAMESPACE+'termValueDelimiter');
		static $MATRIX_BRACKET_TYPE_FORM_CTRL = $('#'+NAMESPACE+'matrixBracketType');
		static $MATRIX_ELEMENT_DELIMITER_FORM_CTRL = $('#'+NAMESPACE+'matrixElementDelimiter');
		static $COMMENT_CHAR_FORM_CTRL = $('#'+NAMESPACE+'commentChar');
		static FORM_RENDER_URL = '';

		static DEFAULT_TERM_DELIMITER = '\n';
		static DEFAULT_TERM_DELIMITER_POSITION = true;
		static DEFAULT_TERM_VALUE_DELIMITER = '=';
		static DEFAULT_MATRIX_BRACKET_TYPE = '[]';
		static DEFAULT_MATRIX_ELEMENT_DELIMITER = ' ';
		static DEFAULT_COMMENT_CHAR = '#';

		constructor( jsonObj ){
			if( jsonObj ){
				this.parse( jsonObj );
			}
			else{
				this.dataTypeId = 0;

				this.termDelimiter= DataStructure.DEFAULT_TERM_DELIMITER;
				this.termDelimiterPosition = DataStructure.DEFAULT_TERM_DELIMITER_POSITION;
				this.termValueDelimiter = DataStructure.DEFAULT_TERM_VALUE_DELIMITER;
				this.matrixBracketType = DataStructure.DEFAULT_MATRIX_BRACKET_TYPE;
				this.matrixElementDelimiter = DataStructure.DEFAULT_MATRIX_ELEMENT_DELIMITER;
				this.commentString = DataStructure.DEFAULT_COMMENT_CHAR;

				this.tooltip = new LocalizedObject();
				this.terms = new Array();

				this.dirty = false;
			}

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

		/**
		 * Disable or enable form controls
		 * 
		 * @param {['string']} controlIds 
		 * @param {'booelan'} disable 
		 */
		disable( controlIds, disable=true ){
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
				return new ListTerm();
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
				if( term.isGroupTerm() ){
					searchedTerm = term.getTerm( term.termName );
					if( searchedTerm ){
						return SXConstants.STOP_EVERY;
					}
				}
				else if( term.termName === termName ){
					searchedTerm = term;
					return SXConstants.STOP_EVERY;
				}
				
				return SXConstants.CONTINUE_EVERY;
			});
			
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

		/**
		 *  Check a term is included in a Group.
		 * */ 
		isInTermGroup( termName ){
			if( !this.terms ){
				return false;
			}

			let inSet = false;
			this.terms.every((term)=>{
				if( term.isInTermSet( termName ) ){
					inSet = true;

					return SXConstants.STOP_EVERY;
				}

				return SXConstants.CONTINUE_EVERY;
			});

			return inSet;
		}

		/**
		 * 
		 */
		chooseGroupTerms( groupTerm ){
			if( !this.terms || this.terms.length === 0 ){
				return null;
			}

			let $groupTermsSelector = $('<div>');
			this.terms.forEach((term, index)=>{
				if( this.isInTermGroup( term ) ){
					return;
				}

				let selected = groupTerm.isInTermSet(term.termName);
				$groupTermsSelector.append( FormUIUtil.$getCheckboxTag( 
					NAMESPACE+'_term_'+(index+1),
					NAMESPACE+'groupTermsSelector',
					term.displayName.getText(CURRENT_LANGUAGE),
					selected,
					term.termName,
					false ) );
			});

			let self = this;
			$groupTermsSelector.dialog({
				title: 'Check Group Terms',
				autoOpen: true,
				dragglable: true,
				modal: true,
				buttons:[
					{
						text: 'Confirm', 
						click: function(){
							let termNameSet = FormUIUtil.getFormCheckedArray('groupTermsSelector');
							if(!Util.isEmptyArray(termNameSet)){
								groupTerm.setTermSet(termNameSet.map(termName=>self.getTerm(termName)));
							}

							$(this).dialog('destroy');
						}
					},
					{
						text: 'Cancel',
						click: function(){
							$(this).dialog('destroy');
						}
					}
				]
			});
		}

		chooseActiveTerms( targetTerm, targetOption ){
			if( !this.terms || this.terms.length === 0 ){
				return null;
			}

			targetTerm.updateDependentTerms();

			let $activeTermsSelector = $('<div>');
			this.terms.forEach((term, index)=>{
				if( term === targetTerm ){
					return;
				}

				let selected = targetOption.activeTerms ? targetOption.activeTerms.includes(term.termName) : false;
				let disabled = false;

				// Check the term is already specified as an active term from other options.
				// On that case, the checkbox for the term should be disabled.
				targetTerm.options.every((option)=>{
					if( option !== targetOption && 
						option.activeTerms && 
						option.activeTerms.includes( term.termName ) ){
						disabled = true;

						return SXConstants.STOP_EVERY;
					}

					return SXConstants.CONTINUE_EVERY;
				});
				
				$activeTermsSelector.append( FormUIUtil.$getCheckboxTag( 
											NAMESPACE+'_term_'+(index+1),
											NAMESPACE+'activeTermsSelector',
											term.displayName.getText(CURRENT_LANGUAGE),
											selected,
											term.termName,
											disabled ) );
			});

			$activeTermsSelector.dialog({
				title: 'Check Active Terms',
				autoOpen: true,
				dragglable: true,
				modal: true,
				buttons:[
					{
						text: 'Confirm', 
						click: function(){
							targetOption.activeTerms = FormUIUtil.getFormCheckedArray('activeTermsSelector');
							$(this).dialog('destroy');
						}
					},
					{
						text: 'Cancel',
						click: function(){
							$(this).dialog('destroy');
						}
					}
				]
			});
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
		addTerm( term, forWhat, validate ){
			if( validate && term.validate() === false ){
				return false;
			}
			
			this.terms.push( term );

			if( forWhat === SXConstants.FOR_PREVIEW ){
				this.renderTermPreview( term );
				this.selectedTerm = term;
			}

			return true;
		}

		extractTerm( termName ){
			let extractedTerm = null;

			this.terms = this.terms.filter( function( term, index, ary ){
				if( term.isGroupTerm() ){
					extractedTerm = term.removeTerm(termName);
				}
				else{
					if( term.termName === termName ){
						extractedTerm = term;
						
						return false;
					}	
				}
				
				return true;
			});

			return extractedTerm;
		}

		removeTerm( termName ){
			let self = this;
			let removedTerm;
			this.terms = this.terms.filter( function( term, index, ary ){
				if( term.termType === SXConstants.GROUP ){
					removedTerm = term.removeTerm(termName);
				}
				else{
					if( term.termName === termName ){
						if( self.selectedTerm === term ){
							self.selectedTerm = null;
						}
						
						self.removeActiveTerm( termName );
						removedTerm = term;
						
						return false;
					}	
				}
				
				return true;
			});

			return removedTerm;
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
					return SXConstants.STOP_EVERY;
				}
				
				return SXConstants.CONTINUE_EVERY;
			});
			
			return exist;
		}
		
		countTerms(){
			return this.terms.length;
		}
		
		parse( jsonObj ){
			let self = this;

			Object.keys(jsonObj).forEach(key=>{
				switch(key){
					case 'dataTypeId':
					case 'termDelimiter':
					case 'termDelimiterPosition':
					case 'termValueDelimiter':
					case 'matrixBracketType':
					case 'matrixElementDelimiter':
					case 'commentChar':
						self[key] = jsonObj[key];
						break;
					case 'tooltip':
						self.tooltip = new LocalizedObject( jsonObj.tooltip );
						break;
					case 'terms':
						jsonObj.terms.forEach( jsonTerm=>{
							self.addTerm( TermTypes.CREATE_TERM(jsonTerm) );
						});

						break;
				}
			});
		}
		
		toJSON(){
			return{
				dataTypeId : this.dataTypeId,
				termDelimiter : this.termDelimiter,
				termValueDelimiter : this.termValueDelimiter,
				termDelimiterPosition : this.termDelimiterPosition,
				matrixBracketType : this.matrixBracketType,
				matrixElementDelimiter : this.matrixElementDelimiter,
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

			if( forWhat === SXConstants.FOR_PREVIEW ){
				term.dependentTerms.forEach((termName)=>{
					if( activeTerms.includes(termName) ){
						$('tr.'+NAMESPACE+termName).removeClass('hide');
					}
					else{
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

		highlightTermPreview( termName ){
			let term = this.getTerm( termName );
			let $panel = DataStructure.$PREVIEW_PANEL;
			
			$panel.find('.highlight-border').each( function(){
				$(this).removeClass('highlight-border');
			});



		}
		
		renderTermPreview( term, order ){
			let isGroupTrem = (term.termType === TermTypes.GROUP);
			// Change the previous highlighted border to normal 
			let $panel = DataStructure.$PREVIEW_PANEL;
			
			$panel.find('.highlight-border').each( function(){
				$(this).removeClass('highlight-border');
			});
			
			let $row = term.$render(SXConstants.FOR_PREVIEW, 'highlight-border' );
			if( !$row ){
				return;
			}

			if( order >= 0 ){
				this.replacePreviewRow( order, $row );
			}
			else{
				$panel.append( $row );
			}
		}

		/**
		 * @depricated
		 * 
		 * @param {Term} term 
		 * @param {*} order 
		 */
		renderTermPreview_Freemarker( term, order ){
			
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
								sxeventData:{
									sourcePortlet: NAMESPACE,
									targetPortlet: NAMESPACE,
									deletedTerm: term
								}
						};
						
						Liferay.fire (SXIcecapEvents.DATATYPE_PREVIEW_TERM_DELETED, eventData );
					}
					else{
						// Change the previous highlighted border to normal 
						$panel.find('.highlight-border').each( function(){
							$(this).removeClass('highlight-border');
						});
						
						const eventData = {
							sxeventData:{
								sourcePortlet: NAMESPACE,
								targetPortlet: NAMESPACE,
								selectedTerm: term
							}
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
					return SXConstants.STOP_EVERY;
				}
				else{
					return SXConstants.CONTINUE_EVERY;
				}
			});
		}
		
		addTestSet( forWhat ){
			// StringTerm
			let dataStructure ={
				termDelimiter: DataStructure.DEFAULT_TERM_DELIMITER,
				termDelimiterPosition: DataStructure.DEFAULT_TERM_DELIMITER_POSITION,
				termValueDelimiter: DataStructure.DEFAULT_TERM_VALUE_DELIMITER,
				matrixBracketType: DataStructure.DEFAULT_MATRIX_BRACKET_TYPE,
				matrixElementDelimiter: DataStructure.DEFAULT_MATRIX_ELEMENT_DELIMITER,
				commentChar: DataStructure.DEFAULT_COMMENT_CHAR,
				tooltip: {
					en_US: 'Data structure tooltip',
					ko_KR: 'Data structure 도움말'
				},
				terms: [
					
					{
						termType: TermTypes.STRING,
						termName: 'multipleLineString',
						termVersion: '1.0.0',
						displayName: {
							'en_US': 'Mltiple Line String Term',
							'ko_KR': '다중라인 문자열 용어'
						},
						definition:{
							'en_US': 'Mltiple Line String Term Definition',
							'ko_KR': '다중라인 문자열 정의'
						},
						tooltip:{
							'en_US': 'Mltiple Line String Term Tooltip',
							'ko_KR': '다중라인 문자열 도움말'
						},
						mandatory: true,
						placeHolder:{
							'en_US': 'Enter test sting',
							'ko_KR': '시험 분자열입력'
						},
						synonyms: 'multiString',
						state: Term.STATE_ACTIVE,
						value: '',
						minLength: 1,
						maxLength: 1024,
						multipleLine: true,
						validationRule: '^[\w\s!@#\$%\^\&*\)\(+=._-]*$'
					},
					
					{
						termType: TermTypes.LIST,
						termName: 'listTerm_01',
						termVersion: '1.0.0',
						displayName: {
							'en_US': 'Test List Term 01',
							'ko_KR': ' 리스트 용어 01'
						},
						definition:{
							'en_US': 'Test List Term Definition',
							'ko_KR': '리스트 용어 정의'
						},
						tooltip:{
							'en_US': 'Test List Term Tooltip',
							'ko_KR': '리스트 용어 도움말'
						},
						mandatory: true,
						synonyms: 'listParam',
						state: Term.STATE_ACTIVE,
						value: '',
						displayStyle: 'select',
						options:[
							{
								labelMap:{
									'en_US': 'List Term Item 01',
									'ko_KR': '리스트 용어 항목 01'
								},
								value:'item01',
								activeTerms:[]
							},
							{
								labelMap:{
									'en_US': 'List Term Item 02',
									'ko_KR': '리스트 용어 항목 02'
								},
								value:'item02',
								activeTerms:[]
							},
							{
								labelMap:{
									'en_US': 'List Term Item 03',
									'ko_KR': '리스트 용어 항목 03'
								},
								value:'item03',
								activeTerms:[]
							},
							,
							{
								labelMap:{
									'en_US': 'List Term Item 04',
									'ko_KR': '리스트 용어 항목 04'
								},
								value:'item04',
								activeTerms:[]
							}
						]
					},
					{
						termType: TermTypes.BOOLEAN,
						termName: 'booleanTerm_01',
						termVersion: '1.0.0',
						displayName: {
							'en_US': 'Test Boolean Term 01',
							'ko_KR': '불리언 용어 01'
						},
						definition:{
							'en_US': 'Test Boolean Term Definition',
							'ko_KR': '불리언 용어 정의'
						},
						tooltip:{
							'en_US': 'Test Boolean Term Tooltip',
							'ko_KR': '불리언 용어 도움말'
						},
						mandatory: true,
						synonyms: 'boolParam',
						state: Term.STATE_ACTIVE,
						value: '',
						displayStyle: 'select',
						options:[
							{
								labelMap:{
									'en_US': 'Boolean Term True Item 01',
									'ko_KR': '뷸라언 용어 트루 항목 01'
								},
								value:true,
								activeTerms:[]
							},
							{
								labelMap:{
									'en_US': 'Boolean Term False Item 02',
									'ko_KR': '뷸라언 용어 폴스 항목 02'
								},
								value:false,
								activeTerms:[]
							}
						]
					},
					{
						termType: TermTypes.GROUP,
						termName: 'groupTerm_01',
						termVersion: '1.0.0',
						displayName: {
							'en_US': 'Test Group Term 01',
							'ko_KR': '그룹 용어 01'
						},
						definition:{
							'en_US': 'Test Group Term Definition',
							'ko_KR': '그룹 용어 정의'
						},
						tooltip:{
							'en_US': 'Test Group Term Tooltip',
							'ko_KR': '그룹 용어 도움말'
						},
						mandatory: true,
						synonyms: 'grpParam',
						state: Term.STATE_ACTIVE,
						termSet: [
							{
								termType: TermTypes.STRING,
								termName: 'testString_01',
								termVersion: '1.0.0',
								displayName: {
									'en_US': 'String Term 01',
									'ko_KR': '문자열 용어 01'
								},
								definition:{
									'en_US': 'String Term 01 Definition',
									'ko_KR': '문자열 용어 01 정의'
								},
								tooltip:{
									'en_US': 'String Term 01 Tooltip',
									'ko_KR': '문자열 용어 01 도움말'
								},
								mandatory: true,
								placeHolder:{
									'en_US': 'Enter test sting',
									'ko_KR': '시험 분자열입력'
								},
								synonyms: 'testStr01',
								value: '',
								state: Term.STATE_ACTIVE,
								minLength: 1,
								maxLength: 72,
								multipleLine: false,
								validationRule: '^[\w\s!@#\$%\^\&*\)\(+=._-]*$'
							},
							{
								termType: TermTypes.NUMERIC,
								termName: 'numericTerm_01',
								termVersion: '1.0.0',
								displayName: {
									'en_US': 'Test Numeric Term 01',
									'ko_KR': '뉴머릭 용어 01'
								},
								definition:{
									'en_US': 'Test Numeric Term Definition',
									'ko_KR': '뉴머릭 용어 정의'
								},
								tooltip:{
									'en_US': 'Test Numeric Term Tooltip',
									'ko_KR': '뉴머릭 용어 도움말'
								},
								mandatory: true,
								synonyms: 'multiString',
								value: '',
								state: Term.STATE_ACTIVE,
								minValue: 1,
								minBoundary: true,
								maxValue: 20,
								maxBoundary: true,
								unit: 'mm',
								uncertainty: true,
								sweepable: true
							}
						]
					}
					
				]
			};

			this.parse( dataStructure );
			this.render( SXConstants.FOR_PREVIEW );

			let lastTerm = this.terms[this.terms.length - 1];
			this.replaceVisibleTypeSpecificSection( lastTerm.termType );
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
				case TermTypes.BOOLEAN:
					return new BooleanTerm();
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
		BooleanTerm: BooleanTerm,
		GroupTerm: GroupTerm,
    	Util: Util
    };
}


