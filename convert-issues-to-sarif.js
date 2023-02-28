const issues = require('./issues.json');

const sarifIssues = issues.issues.map(issue => ({
  ruleId: issue.rule,
  level: issue.severity.toUpperCase(),
  message: issue.message,
  locations: [
    {
      physicalLocation: {
        artifactLocation: {
          uri: issue.component
        },
        region: {
          startLine: issue.line,
          startColumn: issue.textRange.startOffset,
          endColumn: issue.textRange.endOffset
        }
      }
    }
  ]
}));
