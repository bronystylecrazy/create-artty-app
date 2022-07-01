type NodeType = "Directory" | "File";
type Options = any;

export const h = (type: NodeType, options: Options, ...children) => {
  type = type();
  if (children) return { type, options, children: children.flat() };
  return { type, options };
};

export const Directory: React.FC<{ key?: string; out?: string }> = ({
  children,
  key,
}) => {
  return (
    <data key={key} type="directory">
      {children}
    </data>
  );
};

export const File: React.FC<{ key?: string; out?: string }> = ({
  children,
  key,
}) => {
  return (
    <data key={key} type="file">
      {children}
    </data>
  );
};
