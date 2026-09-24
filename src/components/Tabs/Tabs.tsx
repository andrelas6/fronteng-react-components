import {
  useContext,
  createContext,
  useState,
  useId,
  useRef,
  Children,
  isValidElement,
} from "react";
import styled from "styled-components";

export type TabsProps = {
  defaultTab?: string;
  children: React.ReactNode;
};

export type TabProps = {
  name: string;
  children: React.ReactNode;
};

const tabId = (baseId: string, name: string) =>
  `${baseId}-tab-${encodeURIComponent(name)}`;
const panelId = (baseId: string, name: string) =>
  `${baseId}-panel-${encodeURIComponent(name)}`;

export function Tab({ name, children }: TabProps) {
  const { selectedId, baseId } = useTabs();

  if (selectedId !== name) {
    return null;
  }

  return (
    <section
      role="tabpanel"
      id={panelId(baseId, name)}
      aria-labelledby={tabId(baseId, name)}
      tabIndex={0}
    >
      {children}
    </section>
  );
}

type TabsContextValue = {
  setSelectedId: (id: string) => void;
  selectedId: string;
  baseId: string;
};
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);

  if (!ctx) {
    throw new Error("<Tab> must be children of <Tabs>");
  }

  return ctx;
}

function getTabs(children: React.ReactNode): React.ReactElement<TabProps>[] {
  const childrenArray = Children.toArray(children);
  if (!childrenArray.length) {
    throw new Error("<Tabs> should have at least one <Tab>");
  }

  const tabs = childrenArray.filter(
    (element): element is React.ReactElement<TabProps> =>
      isValidElement(element) && element.type === Tab,
  );
  if (tabs.length !== childrenArray.length) {
    throw new Error("<Tabs> should only contain <Tab> as direct children");
  }

  return tabs;
}

export function Tabs({ children, defaultTab }: TabsProps): React.ReactElement {
  const tabs = getTabs(children);
  const [selectedId, setSelectedId] = useState(
    defaultTab ?? tabs[0].props.name,
  );
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    const lastIndex = tabs.length - 1;
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = index === lastIndex ? 0 : index + 1;
        break;
      case "ArrowLeft":
        nextIndex = index === 0 ? lastIndex : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = lastIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelectedId(tabs[nextIndex].props.name);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <TabsContext.Provider value={{ selectedId, setSelectedId, baseId }}>
      <div>
        <StyledUL role="tablist">
          {tabs.map((child, index) => {
            const { name } = child.props;
            const isSelected = selectedId === name;
            return (
              <li key={name} role="presentation">
                <button
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(baseId, name)}
                  aria-selected={isSelected}
                  aria-controls={panelId(baseId, name)}
                  tabIndex={isSelected ? 0 : -1}
                  className={isSelected ? "tab-active" : ""}
                  onClick={() => setSelectedId(name)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  {name}
                </button>
              </li>
            );
          })}
        </StyledUL>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

const StyledUL = styled.ul`
  display: flex;
  list-style: none;

  .tab-active {
    background-color: white;
  }

  li {
    padding: 0 5px;
  }
`;
