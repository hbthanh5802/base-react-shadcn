interface BaseConfigItem {
  path: string;
  title: string;
}

type GenericConfig = Record<string, BaseConfigItem>;

export const mapConfigToNavChildren = (config: GenericConfig) => {
  return Object.entries(config).map(([key, item]) => ({
    key,
    to: `/${item.path}`,
    label: item.title,
  }));
};
