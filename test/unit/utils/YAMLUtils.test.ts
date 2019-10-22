import { YAMLUtils } from './../../../src/utils/YAMLUtils';
describe('YAMLUtils Test', () => {
  it('transferBlockIncludeEmptyField Key-Value Only', () => {
    const keys: string[] = ['key', 'key2', 'key3'];
    const data: { [key: string]: string | string[] } = {
      key: 'value',
      key2: 'value2',
      key3: ''
    };
    const answer: string = '- key: "value"\n  key2: "value2"\n  key3: ""';
    expect(YAMLUtils.transferBlockIncludeEmptyField(keys, data, [])).toEqual(answer);
  });

  it('transferBlockIncludeEmptyField Key-Value Only with trim', () => {
    const keys: string[] = ['key', 'key2', 'key3'];
    const data: { [key: string]: string | string[] } = {
      key: 'value\n',
      key2: 'value2',
      key3: '\r\n'
    };
    const answer: string = '- key: "value"\n  key2: "value2"\n  key3: ""';
    expect(YAMLUtils.transferBlockIncludeEmptyField(keys, data, [])).toEqual(answer);
  });

  it('transferBlockIncludeEmptyField Key-Value and list', () => {
    const keys: string[] = ['key', 'key2', 'key3', 'key4'];
    const data: { [key: string]: string | string[] } = {
      key: 'value',
      key2: 'value2',
      key3: '',
      key4: ['a', 'b', 'c']
    };
    const answer: string =
      '- key: "value"\n  key2: "value2"\n  key3: ""\n  key4:\n    - "a"\n    - "b"\n    - "c"';
    expect(YAMLUtils.transferBlockIncludeEmptyField(keys, data, [])).toEqual(answer);
  });

  it('transferBlockExcludeEmptyField Key-Value Only', () => {
    const keys: string[] = ['key', 'key2', 'key3'];
    const data: { [key: string]: string | string[] } = {
      key: 'value',
      key2: 'value2',
      key3: ''
    };
    const answer: string = '- key: "value"\n  key2: "value2"';
    expect(YAMLUtils.transferBlockExcludeEmptyField(keys, data, [])).toEqual(answer);
  });

  it('transferBlockExcludeEmptyField Key-Value Only with trim', () => {
    const keys: string[] = ['key', 'key2', 'key3'];
    const data: { [key: string]: string | string[] } = {
      key: 'value\n',
      key2: 'value2',
      key3: '\r\n'
    };
    const answer: string = '- key: "value"\n  key2: "value2"';
    expect(YAMLUtils.transferBlockExcludeEmptyField(keys, data, [])).toEqual(answer);
  });

  it('transferBlockExcludeEmptyField Key-Value and list', () => {
    const keys: string[] = ['key', 'key2', 'key3', 'key4'];
    const data: { [key: string]: string | string[] } = {
      key: 'value',
      key2: 'value2',
      key3: '',
      key4: ['a', 'b', 'c']
    };
    const answer: string =
      '- key: "value"\n  key2: "value2"\n  key4:\n    - "a"\n    - "b"\n    - "c"';
    expect(YAMLUtils.transferBlockExcludeEmptyField(keys, data, [])).toEqual(answer);
  });
});
