const jsonFile = require('./issues.json');

const fs = require('fs');

const issues = JSON.parse(jsonFile);

const sarifIssues = issues.issues.map((issue) => {
  const ruleId = issue.rule;
  const level = issue.severity.toUpperCase();
  const message = issue.message;
  const line = issue.line || 1;
  const column = issue.column || 1;
  const startLine = line;
  const startColumn = column;
  const endLine = line;
  const endColumn = column;

  return {
    ruleId: ruleId,
    level: level,
    message: message,
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uri: issue.component,
          },
          region: {
            startLine: startLine,
            startColumn: startColumn,
            endLine: endLine,
            endColumn: endColumn,
          },
        },
      },
    ],
  };
});

const sarifResult = {
  $schema: 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
  version: '2.1.0',
  runs: [
    {
      tool: {
        driver: {
          name: 'SonarQube',
          rules: [],
        },
      },
      results: sarifIssues,
    },
  ],
};

fs.writeFileSync('issues.sarif', JSON.stringify(sarifResult, null, 2));

