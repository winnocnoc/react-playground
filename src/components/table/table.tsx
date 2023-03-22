import classNames from 'classnames';
import styles from './table.module.scss';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/* eslint-disable-next-line */
export interface TableProps {}

interface RecordType {
  a: string;
  b?: string;
  c?: string;
  d: number;
  key: string;
}

const columns = [
  { title: 'title1', dataIndex: 'a', key: 'a', width: 150, fixed: 'left' },
  {
    title: 'title2',
    dataIndex: 'b',
    key: 'b',
    width: 120,
    fixed: 'left',
  },
  { title: 'title3', dataIndex: 'c', key: 'c', width: 120 },
  { title: 'title4', dataIndex: 'b', key: 'd', width: 80 },
  { title: 'title5', dataIndex: 'b', key: 'e', width: 80 },
  { title: 'title6', dataIndex: 'b', key: 'f', width: 60 },
  { title: 'title7', dataIndex: 'b', key: 'g', width: 80, fixed: 'right' },
];

const data: RecordType[] = [
  {
    a: '123',
    b: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    d: 3,
    key: '1',
  },
  { a: 'cdd', b: 'edd12221', d: 3, key: '2' },
  { a: '133', c: 'edd12221', d: 2, key: '3' },
  { a: '133', c: 'edd12221', d: 2, key: '4' },
  { a: '133', c: 'edd12221', d: 2, key: '5' },
  { a: '133', c: 'edd12221', d: 2, key: '6' },
  { a: '133', c: 'edd12221', d: 2, key: '7' },
  { a: '133', c: 'edd12221', d: 2, key: '8' },
  { a: '133', c: 'edd12221', d: 2, key: '9' },
];

export function Table(props: TableProps) {
  const [pinLeft, setPinLeft] = useState(false);
  const [pinRight, setPinRight] = useState(true);

  const containerRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      console.log('scrollLeft:', { scrollLeft, scrollWidth, clientWidth });

      setPinLeft(scrollLeft > 0);

      setPinRight(scrollLeft + clientWidth !== container.scrollWidth);
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isLastStickyColumn = useCallback((i: number) => {
    const lastIndex = columns.reduce((acc, curr, index) => {
      if (curr.fixed === 'left') {
        return index;
      }
      return acc;
    }, -1);

    return lastIndex === i;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} ref={containerRef}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  style={{
                    width: col.width,
                    position: col.fixed ? 'sticky' : 'relative',
                    zIndex: col.fixed ? 1 : 0,
                    left:
                      col.fixed === 'left'
                        ? i > 0
                          ? i * columns[i - 1].width
                          : 0
                        : 0,
                    right:
                      col.fixed === 'right'
                        ? (columns.length - i - 1) * col.width
                        : 0,
                  }}
                  className={classNames(
                    styles.th,
                    pinLeft &&
                      col.fixed === 'left' &&
                      isLastStickyColumn(i) &&
                      styles.pinLeft,
                    pinRight && col.fixed === 'right' && styles.pinRight
                  )}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {data.map((item) => (
              <tr key={item.key}>
                <td
                  className={styles.td}
                  style={{
                    position: 'sticky',
                    left: 0,
                    zIndex: 2,
                  }}
                >
                  {item.a}
                </td>
                <td
                  className={classNames(styles.td, pinLeft && styles.pinLeft)}
                  style={{
                    position: 'sticky',
                    left: 150,
                    zIndex: 2,
                  }}
                >
                  {item.b}
                </td>
                <td className={styles.td}>{item.c}</td>
                <td className={styles.td}>{item.d}</td>
                <td className={styles.td}>{item.c}</td>
                <td className={styles.td}>{item.d}</td>
                <td
                  className={classNames(styles.td, pinRight && styles.pinRight)}
                  style={{ position: 'sticky', right: 0, zIndex: 2 }}
                >
                  {item.d}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
