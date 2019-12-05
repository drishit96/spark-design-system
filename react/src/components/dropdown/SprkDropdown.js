/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import SprkIcon from '../icons/SprkIcon';
import SprkLink from '../../base/links/SprkLink';

class SprkDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerText: props.defaultTriggerText,
      isOpen: false,
      choiceItems: props.choices.items.map(item => ({
        id: uniqueId(),
        ...item,
      })),
    };
    this.toggleDropdownOpen = this.toggleDropdownOpen.bind(this);
    this.closeOnEsc = this.closeOnEsc.bind(this);
    this.closeOnClickOutside = this.closeOnClickOutside.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.selectChoice = this.selectChoice.bind(this);
    this.setSelectedChoice = this.setSelectedChoice.bind(this);
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEsc);
    window.addEventListener('focusin', this.closeOnClickOutside);
    window.addEventListener('click', this.closeOnClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEsc);
    window.removeEventListener('focusin', this.closeOnClickOutside);
    window.removeEventListener('click', this.closeOnClickOutside);
  }

  setSelectedChoice(componentToUpdateId) {
    const { choiceItems } = this.state;
    return choiceItems.map(({ id, isActive, ...rest }) => {
      if (id === componentToUpdateId) {
        return { id, isActive: true, ...rest };
      }
      return { id, isActive: false, ...rest };
    });
  }

  selectChoice(id, text) {
    this.setState({
      triggerText: text,
      choiceItems: this.setSelectedChoice(id),
    });
  }

  toggleDropdownOpen(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  closeOnEsc(e) {
    if (e.key === 'Escape') {
      this.closeDropdown();
    }
  }

  closeOnClickOutside(e) {
    if (!this.dropdownRef.current.contains(e.target)) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const {
      additionalClasses,
      additionalIconClasses,
      additionalTriggerClasses,
      additionalTriggerTextClasses,
      analyticsString,
      choices,
      iconName,
      idString,
      screenReaderText,
      title,
      variant,
    } = this.props;
    const { choiceFunction, footer } = choices;
    const { choiceItems, isOpen, triggerText } = this.state;
    return (
      <div ref={this.dropdownRef}>
        <SprkLink
          element="a"
          variant="plain"
          additionalClasses={classNames(
            { 'sprk-u-mrs': variant === 'informational' },
            additionalTriggerClasses,
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={title ? title : screenReaderText}
          data-analytics={analyticsString || 'undefined'}
          data-id={idString || 'undefined'}
          onClick={this.toggleDropdownOpen}
        >
          {variant === 'informational' && (
            <React.Fragment>
              <span className={classNames(additionalTriggerTextClasses)}>
                {triggerText}
              </span>
              <SprkIcon
                additionalClasses="sprk-c-Icon--stroke-current-color sprk-u-mls"
                iconName="chevron-down"
              />
            </React.Fragment>
          )}
          {variant === 'base' && (
            <React.Fragment>
              <span
                className={classNames(
                  'sprk-u-ScreenReaderText',
                  additionalTriggerTextClasses,
                )}
              >
                {screenReaderText}
              </span>
              <SprkIcon
                iconName={iconName}
                additionalClasses={additionalIconClasses}
              />
            </React.Fragment>
          )}
        </SprkLink>
        {isOpen && (
          <div className={classNames('sprk-c-Dropdown', additionalClasses)}>
            {title !== '' && (
              <div className="sprk-c-Dropdown__header">
                <h2 className="sprk-c-Dropdown__title">{title}</h2>
              </div>
            )}
            <ul
              className="sprk-c-Dropdown__links"
              role="listbox"
            >
              {choiceItems.map((choice) => {
                const {
                  content,
                  element,
                  href,
                  isActive,
                  text,
                  value,
                  idString,
                  ...rest
                } = choice;
                const TagName = element || 'a';
                return (
                  <li
                    className="sprk-c-Dropdown__item"
                    aria-selected={isActive}
                    role="option"
                    key={choice.id}
                  >
                    {variant === 'base' && (
                      <TagName
                        className="sprk-c-Dropdown__link"
                        href={TagName === 'a' ? href || '#' : undefined}
                        onClick={() => {
                          this.selectChoice(choice.id, text);
                          this.closeDropdown();
                          if (choiceFunction) {
                            choiceFunction(value);
                          }
                        }}
                        data-id={idString}
                        {...rest}
                      >
                        {text}
                      </TagName>
                    )}
                    {variant === 'informational' && (
                      <React.Fragment>
                        <TagName
                          className={classNames('sprk-c-Dropdown__link', {
                            'sprk-c-Dropdown__link--active': isActive,
                          })}
                          href={TagName === 'a' ? href || '#' : undefined}
                          onClick={() => {
                            this.selectChoice(choice.id, content.title);
                            this.closeDropdown();
                            if (choiceFunction) {
                              choiceFunction(value);
                            }
                          }}
                          {...rest}
                        >
                          <p className="sprk-b-TypeBodyOne">{content.title}</p>
                          <p className="sprk-b-TypeBodyTwo">
                            {content.infoLine1}
                          </p>
                          <p className="sprk-b-TypeBodyTwo">
                            {content.infoLine2}
                          </p>
                        </TagName>
                      </React.Fragment>
                    )}
                  </li>
                );
              })}
            </ul>
            {footer && (
              <div className="sprk-c-Dropdown__footer sprk-u-TextAlign--center">
                {footer}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

SprkDropdown.propTypes = {
  /**
   * Expects a space separated string
   * of classes to be added to the
   * component.
   */
  additionalClasses: PropTypes.string,
  /**
   * Expects a space separated string
   * of classes to be added to the
   * icon.
   */
  additionalIconClasses: PropTypes.string,
  /**
   * Expects a space separated string of
   * classes to be added to the trigger link element.
   */
  additionalTriggerClasses: PropTypes.string,
  /**
   * Expects a space separated string of
   * classes to be added to the trigger text.
   */
  additionalTriggerTextClasses: PropTypes.string,
  /**
   * The value supplied will be assigned to the
   * `data-analytics` attribute on the component.
   * Intended for an outside
   * library to capture data.
   */
  analyticsString: PropTypes.string,
  /** Incoming children. */
  children: PropTypes.node,
  /** Choices object that builds the dropdown contents. */
  choices: PropTypes.shape({
    /** An array of objects that describe the items in the menu. */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /** The element to render for each menu item. */
        element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        /**
         * Assigned to `href` of the element is `a`.
         */
        href: PropTypes.string,
        /** The text inside the choice item. */
        text: PropTypes.string,
      }),
    ),
  }),
  /** The text set as the default of the trigger link. */
  defaultTriggerText: PropTypes.string,
  /** The icon type of the trigger icon. */
  iconName: PropTypes.string,
  /**
   * The value supplied will be assigned
   * to the `data-id` attribute on the
   * component. This is intended to be
   * used as a selector for automated
   * tools. This value should be unique
   * per page.
   */
  idString: PropTypes.string,
  /**
  * The value supplied will be visually hidden
  * inside the trigger. Userful
  * for when the `title` is empty.
  */
  screenReaderText: PropTypes.string,
  /**
   * The text of the optional header above the
   * choices in the dropdown.
   */
  title: PropTypes.string,
  /**
   * The variant of the Dropdown to render.
   */
  variant: PropTypes.oneOf(['base', 'informational']),
};

SprkDropdown.defaultProps = {
  additionalClasses: '',
  additionalIconClasses: '',
  additionalTriggerClasses: '',
  additionalTriggerTextClasses: '',
  analyticsString: '',
  children: [],
  choices: {
    items: [],
  },
  defaultTriggerText: 'Choose One...',
  iconName: 'chevron-down',
  idString: '',
  screenReaderText: '',
  title: '',
  variant: 'base',
};

export default SprkDropdown;
