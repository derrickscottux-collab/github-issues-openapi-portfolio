# GitHub Issues API - Complete Testing Suite

**Project:** GitHub Issues API OpenAPI Documentation  
**Tester:** Derrick Scott  
**Test Environment:** Postman v11.x  
**API Base URL:** https://api.github.com  
**Test Repositories:**
- **Read Operations:** facebook/react (public repo with lots of data)
- **Write Operations:** derrickscottux-collab/github-api-testing (your personal test repo)

**Testing Period:** 2025-12-10 - 2026-01-06

---

## Testing Setup

**Authentication:**
- Method: Bearer Token (Personal Access Token)
- Scopes: `repo` (full repository access)
- Token expires: [Date]

**Test Data:**
- Public test repo: facebook/react
- Personal test repo: derrickscottux-collab/github-api-testing
- Postman Collection: GitHub Issues API

**Rate Limits:**
- Authenticated: 5,000 requests/hour
- Starting limit: [Check before testing]
- Remaining after latest verified request: 4999 (2026-01-13 21:29 ET)

---

## CATEGORY 1: HAPPY PATH TESTS (Core Functionality)

### TEST #1: List All Issues (Default Behavior)

**Date:** 2025-12-10  
**Time:** 02:14 ET
**Test Repository:** facebook/react

**Purpose:** Verify default endpoint behavior without parameters

**Endpoint:** `GET /repos/{owner}/{repo}/issues`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:** None

**Expected Behavior:**
- Returns only OPEN issues (default state)
- Includes pull requests (GitHub treats PRs as issues)
- Returns array of issue objects
- Default pagination: 30 results per page
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 365 ms
- Number of Results: 30

**Findings:**
- Successfully returned 30 open issues (default pagination)
- Response includes both issues and pull requests as expected
- All returned issues have "state": "open"
- Response structure matches expected Issue object schema
- Rate limit headers received in response

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-001_GET_repos_owner_repo_issues_200_20251210_0214ET.json

---

### TEST #1a: Verify Rate Limit Headers Present (Read Request)

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** facebook/react

**Purpose:** Confirm rate limit headers are returned on successful requests (used for docs and best-practice guidance)

**Endpoint:** `GET /repos/{owner}/{repo}/issues`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:** None

**Expected Behavior:**
- Status code: 200 OK
- Response includes rate limit headers:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

**Actual Response:**
- Status Code: 
- Response Time: 
- X-RateLimit-Limit: 
- X-RateLimit-Remaining: 
- X-RateLimit-Reset: 

**Findings:**


**Test Result:** ⏸️ PENDING

---

### TEST #2: List Open Issues (Explicit Parameter)

**Date:** 2025-12-10  
**Time:** 20:26 ET
**Test Repository:** facebook/react

**Purpose:** Verify explicit state=open parameter works correctly

**Endpoint:** `GET /repos/{owner}/{repo}/issues?state=open`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?state=open
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `state`: open

**Expected Behavior:**
- Returns only open issues
- Should be identical to TEST #1 results
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 450 ms
- Number of Results: 30

**Findings:**
- Results identical to TEST #1 as expected (explicit state=open matches default behavior)
- All issues have "state": "open"
- API returns live data with real-time updates (comment counts, timestamps reflect current state)

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-002_GET_repos_owner_repo_issues_state_open_200_20251210_2026ET.json

---

### TEST #3: List Closed Issues

**Date:** 2025-12-10  
**Time:** 20:30 ET
**Test Repository:** facebook/react

**Purpose:** Verify state=closed parameter returns only closed issues

**Endpoint:** `GET /repos/{owner}/{repo}/issues?state=closed`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?state=closed
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `state`: closed

**Expected Behavior:**
- Returns only closed issues
- All issues should have "state": "closed"
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 621 ms
- Number of Results: 30

**Findings:**
- All returned issues have "state": "closed" as expected
- Mix of regular issues and pull requests included
- All closed issues include "closed_at" timestamps and "closed_by" user objects
- state_reason field can be null even for closed issues
- merged_at field present for closed pull requests

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-003_GET_repos_owner_repo_issues_state_closed_200_20251210_2030ET.json

---

### TEST #4: List All Issues (Open + Closed)

**Date:** 2025-12-10  
**Time:** 20:56 ET
**Test Repository:** facebook/react

**Purpose:** Verify state=all returns both open and closed issues

**Endpoint:** `GET /repos/{owner}/{repo}/issues?state=all`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?state=all
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `state`: all

**Expected Behavior:**
- Returns both open AND closed issues
- Mix of states in results
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: [Time]
- Number of Results: 30

**Findings:**
- Successfully returns mix of both open AND closed issues as expected
- Response demonstrates state=all parameter correctly includes all issue states
- Closed issues include closed_by user object
- state_reason field can be null even for closed issues

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-004_GET_unknown_200_20251210_2056ET.json

---

### TEST #5: Get Single Issue by Number

**Date:** 2025-12-10  
**Time:** 21:01 ET
**Test Repository:** facebook/react

**Purpose:** Verify retrieving a specific issue by its number

**Endpoint:** `GET /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues/1
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react
- `issue_number`: 1

**Query Parameters:** None

**Expected Behavior:**
- Returns single issue object (not array)
- Contains complete issue details
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 416 ms
- Issue Number: 1
- Issue Title: "Run each test in its own <iframe>"

**Findings:**
- Successfully retrieved single issue object (not array)
- This is the very first issue ever created in the React repository (created 2013-05-29)
- Issue is actually a merged pull request
- Response includes complete issue details: body, user info, labels, reactions, comments count
- Historical issue demonstrates API works for very old issues (11+ years old)

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-005_GET_repos_owner_repo_issues_1_200_20251210_2101ET.json

---

### TEST #6: Create Issue (Minimal Fields)

**Date:** 2025-12-12
**Time:** 00:42 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify creating an issue with only required field (title)

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Test Issue"
}
```

**Expected Behavior:**
- Issue created successfully
- Status code: 201 Created
- Response contains new issue with assigned number
- Default state: open

**Actual Response:**
- Status Code: 201 Created
- Response Time: [Time]
- Created Issue Number: 1
- Created Issue ID: 3722061588

**Findings:**
- Issue successfully created with minimal required field (title only)
- Assigned issue number 1 (first issue in repository)
- Issue state correctly set to "open" by default
- Optional fields correctly defaulted to null/empty
- Timestamps automatically generated
- Important: Empty request body causes 422 error - title is required minimum

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-006_POST_repos_owner_github-api-testing_issues_201_20251212_0042ET.json

---

### TEST #7: Create Issue (All Optional Fields)

**Date:** 2025-12-13  
**Time:** 01:20 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify creating issue with all optional fields populated

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Test Issue - All Fields",
  "body": "This is a test issue created via API.\n\n## Testing\n- Markdown support\n- Multiple lines",
  "labels": ["bug", "documentation"],
  "assignees": ["derrickscottux-collab"]
}
```

**Expected Behavior:**
- Issue created with all fields populated
- Status code: 201 Created
- Markdown rendered in body
- Labels and assignees attached (if you have push access)

**Actual Response:**
- Status Code: 201 Created
- Response Time: 667.34ms
- Created Issue Number: 2
- Created Issue ID: 3725580370
- Labels Applied: 2
- Assignees Applied: 1

**Findings:**
- Issue successfully created with all optional fields populated
- Body field contains markdown text exactly as submitted
- Both labels successfully applied and created
- Assignee and assignees array populated correctly
- As repository owner, all fields applied successfully (not silently dropped)
- Important: Using placeholder text in assignees array causes 422 error

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-007_POST_repos_owner_repo_issues_201_20251213_0120ET.json

---

### TEST #8: Update Issue Title

**Date:** 2025-12-13  
**Time:** 02:16 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify partial update (only changing title field)

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/1
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `issue_number`: 1

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Updated Title via API - Test #8"
}
```

**Expected Behavior:**
- Only title changes
- Other fields remain unchanged
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 501 ms
- Updated Title: "Updated Title via API - Test #8"

**Findings:**
- Partial update successful - only the title field was modified
- All other fields remained unchanged (body, labels, assignees, state)
- created_at timestamp unchanged from original
- updated_at timestamp refreshed to reflect modification time
- PATCH endpoint correctly implements partial update pattern

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-008_PATCH_repos_owner_repo_issues_1_200_20251213_0216ET.json

---

### TEST #9: Close Issue with Reason

**Date:** 2025-12-13
**Time:** 02:27 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify changing issue state to closed with state_reason

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/1
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `issue_number`: 1

**Query Parameters:** None

**Request Body:**
```json
{
  "state": "closed",
  "state_reason": "completed"
}
```

**Expected Behavior:**
- Issue state changes to closed
- State reason recorded
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 441 ms
- New State: "closed"
- State Reason: "completed"

**Findings:**
- Issue state successfully changed from "open" to "closed"
- State reason correctly recorded: "completed"
- Closed timestamp generated: closed_at populated
- Closed by user recorded: closed_by object populated
- Updated timestamp refreshed to match close time
- Original creation timestamp preserved

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-009_PATCH_repos_owner_repo_issues_1_200_20251213_0227ET.json

---

### TEST #10: List Comments on Issue

**Date:** 2025-12-10  
**Time:** 02:31 ET
**Test Repository:** facebook/react

**Purpose:** Verify retrieving comments from an issue

**Endpoint:** `GET /repos/{owner}/{repo}/issues/{issue_number}/comments`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues/1/comments
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react
- `issue_number`: 1

**Query Parameters:** None

**Expected Behavior:**
- Returns array of comment objects
- Comments ordered by ascending ID (oldest first)
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 222 ms
- Number of Comments: 5

**Findings:**
- Successfully retrieved all comments on issue #1
- Comment ordering confirmed: ascending ID order (oldest first)
- Historical data span: Comments range from 2013 to 2025 (12+ years)
- Comment structure includes: id, body, user, timestamps, author_association, reactions
- Author associations observed: MEMBER, CONTRIBUTOR, NONE
- Endpoint works for pull requests as documented
- No pagination applied - all comments returned in single response

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-010_GET_repos_owner_repo_issues_1_comments_200_20251213_0231ET.json

---

## CATEGORY 2: PARAMETER VALIDATION TESTS

### TEST #11: Pagination - Limit Results

**Date:** 2025-12-14  
**Time:** 20:40 ET
**Test Repository:** facebook/react

**Purpose:** Verify per_page parameter limits results returned

**Endpoint:** `GET /repos/{owner}/{repo}/issues?per_page=10`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=10
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `per_page`: 10

**Expected Behavior:**
- Returns exactly 10 issues (not 30 default)
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 372 ms
- Number of Results: 10

**Findings:**
- Successfully limited results to exactly 10 issues (vs 30 default)
- Pagination parameter working as documented
- All returned issues are open (default state behavior still applies)
- Mix of regular issues and pull requests in results
- Pagination doesn't affect other default behaviors

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-011_GET_repos_owner_repo_issues_per_page_10_200_20251214_2039ET.json

---

### TEST #12: Pagination - Second Page

**Date:** 2025-12-14  
**Time:** 20:46 ET
**Test Repository:** facebook/react

**Purpose:** Verify page parameter returns correct page of results

**Endpoint:** `GET /repos/{owner}/{repo}/issues?per_page=5&page=2`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=5&page=2
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `per_page`: 5
- `page`: 2

**Expected Behavior:**
- Returns 5 results (items 6-10)
- Different issue numbers than TEST #11
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 323 ms
- Number of Results: 5
- First Issue Number: 35342

**Findings:**
- Successfully returned exactly 5 results as specified
- Page 2 returned issues 6-10 from the sorted list
- Confirmed different results from page 1
- Pagination properly skipped the first 5 results
- Pagination maintains sort order (created date descending by default)

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-012_GET_unknown_200_20251214_2046ET.json

---

### TEST #13: Pagination - Maximum Limit

**Date:** 2025-12-14  
**Time:** 20:52 ET
**Test Repository:** facebook/react

**Purpose:** Verify maximum per_page limit (100)

**Endpoint:** `GET /repos/{owner}/{repo}/issues?per_page=100`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=100
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `per_page`: 100

**Expected Behavior:**
- Returns up to 100 issues (maximum allowed)
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 765 ms
- Number of Results: 100

**Findings:**
- Successfully returned the maximum allowed 100 results per single API request
- API accepted and honored the per_page=100 parameter
- Confirmed that 100 is the hard ceiling for per_page parameter
- All 100 results maintain consistent JSON structure
- No truncation or data corruption observed

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-013_GET_repos_owner_repo_issues_per_page_100_200_20251214_2051ET.json

---

### TEST #14: Filter by Single Label

**Date:** 2025-12-14  
**Time:** 21:01 ET
**Test Repository:** openai/codex

**Purpose:** Verify filtering by single label name

**Endpoint:** `GET /repos/{owner}/{repo}/issues?labels=bug`

**Request Details:**
```
GET https://api.github.com/repos/openai/codex/issues?labels=bug
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: openai
- `repo`: codex

**Query Parameters:**
- `labels`: bug

**Expected Behavior:**
- Returns only issues with "bug" label
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 602 ms
- Number of Results: 30

**Findings:**
- Successfully filtered results to return only issues with the "bug" label
- All returned issues contain the "bug" label in their labels array
- Issues can have additional labels beyond "bug"
- Filter works with AND logic when an issue has multiple labels
- Non-existent labels return empty array [] with 200 OK status

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-014_GET_repos_openai_codex_issues_labels_bug_200_20251214_2057ET.json

---

### TEST #15: Filter by Multiple Labels

**Date:** 2025-12-14  
**Time:** 21:18 ET
**Test Repository:** openai/codex

**Purpose:** Verify filtering by multiple comma-separated labels

**Endpoint:** `GET /repos/{owner}/{repo}/issues?labels=bug,extension`

**Request Details:**
```
GET https://api.github.com/repos/openai/codex/issues?labels=bug,extension
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: openai
- `repo`: codex

**Query Parameters:**
- `labels`: bug,extension

**Expected Behavior:**
- Returns issues with BOTH labels (AND logic)
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 3.56 s
- Number of Results: 30

**Findings:**
- Successfully filtered results to return only issues containing BOTH "bug" AND "extension" labels
- Multiple label filtering uses AND logic (not OR)
- All returned issues must have all specified labels
- Issues can have additional labels beyond the filtered ones
- Label order in query parameter doesn't affect results

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-015_GET_repos_openai_codex_issues_labels_type_bug_status_conf_200_20251214_2118ET.json

---

### TEST #16: Filter by Assignee - Specific User

**Date:** 2025-12-18
**Time:** 16:04 ET
**Test Repository:** facebook/react

**Purpose:** Verify filtering issues assigned to a specific user

**Endpoint:** `GET /repos/{owner}/{repo}/issues?assignee={username}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?assignee=gaearon
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `assignee`: gaearon

**Expected Behavior:**
- Returns only issues assigned to the specified user (gaearon)
- Status code: 200 OK
- If no issues are assigned to that user, returns empty array []

**Actual Response:**
- Status Code: 200 OK
- Response Time: 399 ms
- Number of Results: 18

**Findings:**
- **Note:** The assignee parameter accepts:
  - A specific username (e.g., "hoxyq")
  - `none` for issues with no assigned user
  - `*` for issues assigned to any user
- Returning empty array [] is valid if the user has no assigned issues

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-016_GET_unknown_200_20251218_1604ET.json

---

### TEST #16a: Filter by Assignee - No Assignee

**Date:** 2025-12-18
**Time:** 18:03 ET
**Test Repository:** facebook/react

**Purpose:** Verify filtering issues with no assignee

**Endpoint:** `GET /repos/{owner}/{repo}/issues?assignee=none`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?assignee=none
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `assignee`: none

**Expected Behavior:**
- Returns only issues with no assigned user
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 509ms
- Number of Results: 30

**Findings:**
- `assignee=none` returns issues with empty `assignees` arrays
- Issues with any assigned user are excluded
- Pull requests without assignees are also included
- Empty result set is valid when all issues are assigned
- Behavior is explicit and predictable


---

**Evidence:** evidence/raw/TEST-016A_GET_unknown_200_20251218_1803ET.json
**Test Result:** ✅ PASS
### TEST #16b: Filter by Assignee - Any User

**Date:** 2026-01-13
**Time:** 21:29 ET
**Test Repository:** facebook/react

**Purpose:** Verify filtering issues assigned to any user

**Endpoint:** `GET /repos/{owner}/{repo}/issues?assignee=*`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?assignee=*
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `assignee`: *

**Expected Behavior:**
- Returns only issues assigned to any user (excludes unassigned)
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 555ms
- Number of Results: 30

**Findings:**

- The response contains issues with non-null `assignee` objects and non-empty `assignees` arrays, consistent with `assignee=*`.
- Verified on **2026-01-13 21:29 ET** using the captured response in `evidence/raw/TEST-016B_GET_repos_facebook_react_issues_assignee_unknown_200_20260113_2129ET.json`.
- Result count: **30** issues returned in this response.

---

**Evidence:** evidence/raw/TEST-016B_GET_repos_facebook_react_issues_assignee_unknown_200_20260113_2129ET.json
**Test Result:** ✅ PASS
### TEST #17: Filter by Creator

**Date:** 2025-12-18
**Time:** 18:08 ET
**Test Repository:** facebook/react

**Purpose:** Verify filtering by issue creator username

**Endpoint:** `GET /repos/{owner}/{repo}/issues?creator={username}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?creator=gaearon
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `creator`: gaearon

**Expected Behavior:**
- Returns only issues created by specified user
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 474 ms
- Number of Results: 30

**Findings:**
- Results include only issues authored by specified user
- Pull requests authored by the user are also included
- Creator filter applies before pagination
- Useful for contributor activity analysis

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-017_GET_unknown_200_20251218_1808ET.json

---

### TEST #18: Filter by Mentioned

**Date:** 2025-12-18
**Time:** 22:47 ET
**Test Repository:** facebook/react

**Purpose:** Verify filtering by mentioned user

**Endpoint:** `GET /repos/{owner}/{repo}/issues?mentioned={username}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?mentioned=gaearon
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `mentioned`: gaearon

**Expected Behavior:**
- Returns issues where user is mentioned
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 596 ms
- Number of Results: 30

**Findings:**
- Mentions include both issue bodies and comments
- Mentions are case-insensitive
- Empty array returned if user is never mentioned
- Useful for notification and triage tooling

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-018_GET_unknown_200_20251218_2247ET.json

---

### TEST #19: Sort by Created Date (Default)

**Date:** 2025-12-14  
**Time:** 21:46 ET
**Test Repository:** facebook/react

**Purpose:** Verify sort=created parameter (should be default)

**Endpoint:** `GET /repos/{owner}/{repo}/issues?sort=created`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?sort=created
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `sort`: created

**Expected Behavior:**
- Issues sorted by creation date (newest first by default)
- Should match TEST #1 results
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 396 ms
- Number of Results: 30

**Findings:**
- Successfully sorted results by creation date with newest first (descending order is default)
- Confirmed this matches TEST #1 default behavior
- Default direction is descending (desc) when not specified
- created_at timestamps use ISO 8601 format consistently
- Sort parameter doesn't affect other default behaviors

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-019_GET_unknown_200_20251214_2146ET.json

---

### TEST #20: Sort by Updated Date

**Date:** 2025-12-14  
**Time:** 21:51 ET
**Test Repository:** facebook/react

**Purpose:** Verify sort=updated parameter sorts by last update

**Endpoint:** `GET /repos/{owner}/{repo}/issues?sort=updated`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?sort=updated
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `sort`: updated

**Expected Behavior:**
- Issues sorted by last updated date (most recently updated first)
- Different order than TEST #19
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 578 ms
- Number of Results: 30

**Findings:**
- Successfully sorted results by updated_at timestamp in descending order
- Different from TEST #19 (sort=created)
- Useful for finding issues with recent activity regardless of creation date
- Both old and new issues can appear based on recent updates

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-020_GET_repos_owner_repo_issues_sort_updated_200_20251214_2151ET.json

---

### TEST #21: Sort by Comments

**Date:** 2025-12-14  
**Time:** 21:55 ET
**Test Repository:** facebook/react

**Purpose:** Verify sort=comments parameter sorts by comment count

**Endpoint:** `GET /repos/{owner}/{repo}/issues?sort=comments`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?sort=comments
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `sort`: comments

**Expected Behavior:**
- Issues sorted by number of comments (most commented first)
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 643 ms
- Number of Results: 30
- First Issue Comment Count: 513

**Findings:**
- Successfully sorted results by comment count in descending order
- Reveals most discussed/debated topics in repository
- These are long-standing, highly-discussed issues (7+ years old)
- Useful for finding controversial features or complex problems
- Some highly-commented issues may be locked due to heated discussions

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-021_GET_repos_owner_repo_issues_sort_comments_200_20251214_2155ET.json

---

### TEST #22: Sort Direction - Ascending

**Date:** 2025-12-14  
**Time:** 21:58 ET
**Test Repository:** facebook/react

**Purpose:** Verify direction=asc parameter reverses sort order

**Endpoint:** `GET /repos/{owner}/{repo}/issues?sort=created&direction=asc`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?sort=created&direction=asc
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `sort`: created
- `direction`: asc

**Expected Behavior:**
- Issues sorted oldest first (ascending order)
- Opposite order from TEST #19
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 468 ms
- First Issue Created Date: 2013-08-21T21:41:26Z
- Last Issue Created Date: 2016-07-21T12:26:25Z

**Findings:**
- Successfully reversed sort order to ascending (oldest issues first)
- These are the repository's oldest still-open issues (10+ years old)
- Direction parameter successfully overrides default descending behavior
- Useful for finding long-standing issues or technical debt
- Even very old issues show recent updated_at timestamps (continued attention)

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-022_GET_unknown_200_20251214_2158ET.json

---

### TEST #23: Filter by Since Timestamp

**Date:** 2025-12-14  
**Time:** 22:02 ET
**Test Repository:** facebook/react

**Purpose:** Verify since parameter filters by update timestamp

**Endpoint:** `GET /repos/{owner}/{repo}/issues?since=2024-01-01T00:00:00Z`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?since=2024-01-01T00:00:00Z
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `since`: 2024-01-01T00:00:00Z

**Expected Behavior:**
- Returns only issues updated after January 1, 2024
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 604 ms
- Number of Results: 30

**Findings:**
- All returned issues have updated_at timestamps after 2024-01-01
- Filter correctly excludes issues not updated since cutoff date
- Default sorting by created date (descending) applied after filtering

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-023_GET_unknown_200_20251214_2202ET.json

---

### TEST #24: Filter by Milestone

**Date:** 2025-12-18
**Time:** 23:46 ET
**Test Repository:** facebook/react

**Purpose:** Verify filtering by milestone number

**Endpoint:** `GET /repos/{owner}/{repo}/issues?milestone={milestone_number}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?milestone=1
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `milestone`: 1
**Expected Behavior:**
- Returns only issues assigned to specified milestone
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 549 ms
- Number of Results: 5

**Findings:**
- Returns issues with specified milestone
- **Not tested:** `milestone=*` and `milestone=none`
- Empty array valid

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-024_GET_unknown_200_20251218_2346ET.json

---

### TEST #25: Combine Multiple Filters

**Date:** 2025-12-14  
**Time:** 22:09 ET
**Test Repository:** facebook/react

**Purpose:** Verify multiple parameters work together (AND logic)

**Endpoint:** `GET /repos/{owner}/{repo}/issues?state=closed&labels=Type%3A%20Bug`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?state=closed&labels=Type%3A%20Bug
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `state`: closed
- `labels`: Type: Bug

**Expected Behavior:**
- Returns only CLOSED issues with "bug" label
- Both conditions must match (AND logic)
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 1.66s
- Number of Results: 30

**Findings:**
- All returned issues have state: "closed" field
- All results contain "Type: Bug" label in their labels array
- AND logic correctly applied
- Response time higher due to compound index usage

**Test Result:** ✅ PASS 
**Evidence:** evidence/raw/TEST-025_GET_repos_owner_repo_issues_state_closed_labels_type_3a_20bug_200_20251214_2209ET.json

---

## CATEGORY 3: COMMENT OPERATIONS TESTS

### TEST #26: Create Comment on Issue

**Date:** 2025-12-18
**Time:** 23:51 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify creating a comment on an issue

**Endpoint:** `POST /repos/{owner}/{repo}/issues/{issue_number}/comments`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/2/comments
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `issue_number`: 2

**Query Parameters:** None

**Request Body:**
```json
{
  "body": "This is a test comment created via API."
}
```

**Expected Behavior:**
- Comment created successfully
- Status code: 201 Created
- Response includes comment ID

**Actual Response:**
- Status Code: 201 Created
- Response Time: 702 ms
- Comment ID: 3673471450

**Findings:**
- Response includes complete comment object with all standard fields (id, node_id, user, body, timestamps, reactions, etc.)
- The `created_at` and `updated_at` timestamps are identical (2025-12-19T04:51:40Z), confirming this is a new comment
- The `author_association` field is set to "OWNER", correctly reflecting the authenticated user's relationship to the repository
- The `reactions` object is initialized with all reaction types set to 0 and `total_count` of 0
- All URL fields use the correct API domain (api.github.com) and follow RESTful patterns
- The `performed_via_github_app` field is null, indicating direct API usage rather than through a GitHub App

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-026_POST_repos_owner_repo_issues_2_comments_201_20251218_2351ET.json

---

### TEST #27: Create Comment with Markdown

**Date:** 2025-12-19
**Time:** 03:57 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify markdown formatting in comments

**Endpoint:** `POST /repos/{owner}/{repo}/issues/{issue_number}/comments`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/2/comments
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `issue_number`: 2

**Query Parameters:** None

**Request Body:**
```json
{
  "body": "## Test Comment\n\nMarkdown **works** here!\n\n- Item 1\n- Item 2\n\n`code example`"
}
```

**Expected Behavior:**
- Comment created with markdown
- Status code: 201 Created

**Actual Response:**
- Status Code: 201 Created
- Response Time: 535 ms
- Comment ID: 3674173153

**Findings:**
- The API accepts and stores markdown syntax without transformation in the `body` field
- Raw markdown formatting (newlines as `\n`, headers with `##`, bold with `**`, lists with `-`, inline code with backticks) is preserved exactly as submitted
- Response structure is identical to plain text comments, with no special processing or validation indicators
- The `body` field in the response contains the exact markdown string sent in the request, including all escape sequences
- Markdown rendering occurs client-side; the API treats comment bodies as raw text regardless of markdown syntax
- Consistent behavior with Test #26: returns 200 OK instead of 201 Created

**Test Result:** (inherits PASS from #26)
**Evidence:** evidence/raw/TEST-027_POST_repos_owner_repo_issues_2_comments_201_20251219_0357ET.json

---

### TEST #28: Create Comment with @mention

**Date:** 2025-12-19
**Time:** 15:56 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify @mention functionality in comments

**Endpoint:** `POST /repos/{owner}/{repo}/issues/{issue_number}/comments`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/2/comments
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `issue_number`: 2

**Query Parameters:** None

**Request Body:**
```json
{
  "body": "Hey @derrickscottux-collab, this is a test mention!"
}
```

**Expected Behavior:**
- Comment created with mention
- Status code: 201 Created
- User should receive notification

**Actual Response:**
- Status Code: 201 Created
- Response Time: 448 ms
- Comment ID: 3676594790

**Findings:**
- The API accepts @mentions in comment bodies without special syntax validation or transformation
- The mention syntax (@username) is stored as plain text in the `body` field, identical to how it was submitted
- No special metadata or fields in the response indicate that a mention was detected or processed
- The response structure is identical to non-mention comments, suggesting mention processing occurs outside the comment creation endpoint
- Performance improved compared to Tests #26 and #27 (448ms vs 702ms and 535ms respectively), though response times may vary by network/server conditions
- **Note:** Whether the mentioned user received a notification cannot be confirmed from the API response alone

**Test Result:** (inherits PASS from #26)
**Evidence:** evidence/raw/TEST-028_POST_repos_owner_repo_issues_2_comments_201_20251219_1555ET.json

---

### TEST #29: List Comments with Pagination

**Date:** 2025-12-19  
**Time:** 16:14 ET
**Test Repository:** facebook/react

**Purpose:** Verify pagination works on comments endpoint

**Endpoint:** `GET /repos/{owner}/{repo}/issues/{issue_number}/comments?per_page=3`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues/1/comments?per_page=3
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react
- `issue_number`: 1
**Query Parameters:**
- `per_page`: 3

**Expected Behavior:**
- Returns up to 3 comments
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 176 ms
- Number of Comments: 3

**Findings:**
- Pagination uses the `Link` response header. In observed responses, the `next` URL may use the `repositories/{repository_id}/issues/{issue_id}` format instead of `{owner}/{repo}/issues/{issue_number}`.
- The `per_page` query parameter successfully limits results to the requested count (3 comments returned)
- Response is an array of complete comment objects, each with identical structure to individual comment creation responses
- Comments are returned in chronological order by `created_at` timestamp (earliest first: Dec 9 12:38:38Z, 12:40:22Z, 12:56:38Z)
- All three comments are from the same user (gaearon, id: 810438) with `author_association` of "COLLABORATOR"
- The second comment contains a reference to another PR (#35337), demonstrating cross-reference behavior
- The third comment includes an HTML code block in markdown, with timestamps showing it was edited (`updated_at` differs from `created_at`)
- **Critical finding from test documentation:** Accidentally using POST instead of GET with a body will create a comment, not return an error - the API is forgiving of method confusion when a body is present

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-029_GET_repos_owner_repo_issues_35336_comments_per_page_3_200_20251219_1611ET.json

---

### TEST #30: List Comments with Since Filter

**Date:** 2025-12-19  
**Time:** 18:04 ET
**Test Repository:** facebook/react

**Purpose:** Verify since parameter filters comments by timestamp

**Endpoint:** `GET /repos/{owner}/{repo}/issues/{issue_number}/comments?since=2025-12-19T00:00:00Z`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues/1/comments?since=2025-12-19T00:00:00Z
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react
- `issue_number`: 35379

**Query Parameters:**
- `since`: 2025-12-19T00:00:00Z

**Expected Behavior:**
- Returns only comments updated after December 19th, 2025
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 182 ms
- Number of Comments: 4

**Findings:**
- The `since` parameter filters by `updated_at` timestamp, not `created_at` - all returned comments have `updated_at` on or after 2025-12-19T00:00:00Z
- Comments from three different users were returned (Mudavath-Giri-Naik, mallorysmith64, devuxer) with varying `author_association` values (all "NONE" for this issue)
- One comment (id: 3674202200) shows evidence of being updated after creation: `created_at` is 09:07:52Z but `updated_at` is 11:12:47Z, and it still appears in results filtered to Dec 19
- The response includes GitHub's spam detection behavior: devuxer's comment (id: 3676159374) references a reply that "GitHub marked as spam"
- Comments demonstrate a conversation thread with @mentions and quotes, showing the API returns complete conversational context
- The filter successfully excludes older comments from the issue, confirming temporal filtering works as expected

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-030_GET_repos_owner_repo_issues_35379_comments_since_2025-12-19t00_00_00z_200_20251219_1804ET.json

---

## CATEGORY 4: MEDIA TYPE TESTS

## CATEGORY 4: MEDIA TYPE TESTS

### TEST #31: Default Media Type (Raw Markdown)

**Date:** 2025-12-19
**Time:** 15:59 ET
**Goal:** Confirm default response includes raw Markdown body in `body` (not rendered fields).

**Endpoint:** `GET /repos/facebook/react/issues/1`  
**Query Parameters:** None  
**Headers:**
- Authorization: Bearer [your-token]
- Accept: `application/vnd.github+json`

**Expected:**
- Status: `200 OK`
- Response
  - Includes `body` (raw Markdown string)
  - Does **not** include `body_text` or `body_html`
  - Includes PR fields (since this issue is a PR in this repo)

**Actual Response:**
- Status: `200 OK`
- Time: ~214 ms
- Response fields:
  - `body` present
  - `body_text` absent
  - `body_html` absent
  - PR fields present: `pull_request`, `merged_at`

**Findings:**
- Default `application/vnd.github+json` returns raw Markdown in `body` only.  
- Response header `X-GitHub-Media-Type` showed `github.v3; format=json` (default representation).

**Test Result:** PASS
**Evidence:** evidence/raw/TEST-031_GET_unknown_200_20251220_0319ET.json

---

### TEST #32: Text-Only Media Type (`body_text`)

**Date:** 2025-12-19
**Time:** 15:59 ET
**Goal:** Confirm `application/vnd.github.text+json` returns plain-text rendering in `body_text`.

**Endpoint:** `GET /repos/facebook/react/issues/1`  
**Headers:**
- Authorization: Bearer [your-token]
- Accept: `application/vnd.github.text+json`

**Expected:**
- Status: `200 OK`
- Response
  - Includes `body_text`
  - Does **not** include `body_html`
  - `body` may be omitted in this representation

**Actual Response:**
- Status: `200 OK`
- Time: ~224 ms
- Response fields:
  - `body_text` present
  - `body` absent
  - `body_html` absent

**Findings:**
- `application/vnd.github.text+json` returns `body_text` and omits `body` and `body_html`.  
- Response header `X-GitHub-Media-Type` showed `github.v3; param=text; format=json`.

**Test Result:** PASS
**Evidence:** evidence/raw/TEST-032_GET_unknown_200_20251220_0323ET.json

---

### TEST #33: HTML Media Type (`body_html`)

**Date:** 2025-12-19
**Time:** 15:59 ET
**Goal:** Confirm `application/vnd.github.html+json` returns HTML rendering in `body_html`.

**Endpoint:** `GET /repos/facebook/react/issues/1`  
**Headers:**
- Authorization: Bearer [your-token]
- Accept: `application/vnd.github.html+json`
- X-GitHub-Api-Version: `2022-11-28`

**Expected:**
- Status: `200 OK`
- Response
  - Includes `body_html`
  - Does **not** include `body_text`
  - `body` may be omitted in this representation

**Actual Response:**
- Status: `200 OK`
- Time: ~209 ms
- Response fields:
  - `body_html` present
  - `body` absent
  - `body_text` absent

**Findings:**
- `application/vnd.github.html+json` returns `body_html` and omits `body` and `body_text`.  
- Response header `X-GitHub-Media-Type` showed `github.v3; param=html; format=json`.

**Test Result:** PASS
**Evidence:** evidence/raw/TEST-033_GET_unknown_200_20251220_0325ET.json

---

### TEST #34: Full Media Type (All Body Fields)

**Date:** 2025-12-19
**Time:** 15:59 ET
**Goal:** Confirm `application/vnd.github.full+json` returns `body`, `body_text`, and `body_html`.

**Endpoint:** `GET /repos/facebook/react/issues/1`  
**Headers:**
- Authorization: Bearer [your-token]
- Accept: `application/vnd.github.full+json`
- X-GitHub-Api-Version: `2022-11-28`

**Expected:**
- Status: `200 OK`
- Response
  - Includes `body`
  - Includes `body_text`
  - Includes `body_html`

**Actual Response:**
- Status: `200 OK`
- Time: ~218 ms
- Response fields:
  - `body` present
  - `body_text` present
  - `body_html` present

**Findings:**
- `application/vnd.github.full+json` returns all three: `body`, `body_text`, and `body_html`.  
- Response header `X-GitHub-Media-Type` showed `github.v3; param=full; format=json`.

**Test Result:** PASS
**Evidence:** evidence/raw/TEST-034_GET_unknown_200_20251220_0327ET.json

---
### TEST #35: Invalid Issue Number (404)

**Date:** 2025-12-20  
**Time:** 03:34 ET
**Test Repository:** facebook/react

**Purpose:** Verify 404 error for non-existent issue

**Endpoint:** `GET /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues/999999999
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react
- `issue_number`: 999999999

**Query Parameters:** None

**Expected Behavior:**
- Status code: 404 Not Found
- Error message in response

**Actual Response:**
- Status Code: 404
- Response Time: 114 ms
- Error Message: Not Found

**Findings:**
- The API returns a consistent error response structure with three fields: `message`, `documentation_url`, and `status`
- The `message` field contains a simple "Not Found" string without additional detail about what resource was not found
- The `documentation_url` points to the specific endpoint documentation: `https://docs.github.com/rest/issues/issues#get-an-issue`
- The `status` field is a string ("404") rather than a number, duplicating the HTTP status code in the response body
- The error response does not include details about the invalid issue number (999999999) that was requested
- Response time (114ms) is faster than successful requests, suggesting early termination when resource is not found
- No additional error metadata is provided (no error codes, error IDs, or suggested corrections)

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-035_GET_unknown_404_20251220_0334ET.json

---

### TEST #36: Non-existent Repository (404)

**Date:** 2025-12-20  
**Time:** 03:39 ET
**Test Repository:** N/A

**Purpose:** Verify 404 error for non-existent repository

**Endpoint:** `GET /repos/{owner}/{repo}/issues`

**Request Details:**
```
GET https://api.github.com/repos/facebook/nonexistentrepo123456/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: nonexistentrepo123456

**Query Parameters:** None

**Expected Behavior:**
- Status code: 404 Not Found
- Error message indicating repository not found

**Actual Response:**
- Status Code: 404
- Response Time: 70 ms
- Error Message: Not Found

**Findings:**
- The error response structure is identical to Test #35 (invalid issue number), using the same three-field format
- The `message` remains generic "Not Found" without distinguishing between a non-existent repository vs a non-existent issue
- The `documentation_url` points to generic REST documentation (`https://docs.github.com/rest`) rather than the specific issues endpoint, suggesting GitHub recognizes this as a repository-level error
- Response time (70ms) is even faster than the invalid issue number (114ms), indicating repository lookup may occur earlier in the request processing pipeline
- The API does not reveal whether the repository doesn't exist or the authenticated user lacks permission to view it (privacy protection)
- No distinction in error messaging between truly non-existent repositories and private repositories the user cannot access

**Test Result:** (inherits PASS from #35)
**Evidence:** evidence/raw/TEST-036_GET_repos_owner_nonexistentrepo123456_issues_404_20251220_0339ET.json

---

### TEST #37: Create Issue - Missing Title (422)

**Date:** 2025/12/20     
**Time:** 03:41 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify validation error when title is missing

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "body": "Issue with no title"
}
```

**Expected Behavior:**
- Status code: 422 Unprocessable Entity
- Validation error message

**Actual Response:**
- Status Code: 422 Unprocessable Entity
- Response Time: 134 ms
- Error Message: Invalid request.\n\n\"title\" wasn't supplied.

**Findings:**
- The API uses 422 Unprocessable Entity for validation errors, distinct from 404 (not found) and 400 (bad request)
- The error response maintains the same three-field structure as 404 errors: `message`, `documentation_url`, `status`
- The `message` field includes a multi-line string with literal `\n\n` characters: "Invalid request.\n\n\"title\" wasn't supplied."
- The error message explicitly names the missing field ("title") with quoted formatting
- The `documentation_url` points to the specific creation endpoint: `https://docs.github.com/rest/issues/issues#create-an-issue`
- Unlike more detailed validation errors, this response does **not** include an `errors` array (compare to Test #38), suggesting a different error format for completely missing required fields vs empty/invalid values
- The `status` field contains "422" as a string, consistent with other error responses

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-037_POST_repos_owner_repo_issues_422_20251220_0341ET.json

---

---

### TEST #37a: Create Issue Without Authorization (401/403)

**Date:** 2025/12/20      
**Time:** 03:46 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify authentication requirements for write operations (create issue)

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json
- `Authorization`: (omitted)

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Unauthorized Create Issue Attempt"
}
```

**Expected Behavior:**
- Request is rejected due to missing authentication
- Status code: 401 Unauthorized (or 403 Forbidden, depending on GitHub behavior)
- Error message indicates authentication is required

**Actual Response:**
- Status Code: 401 Unauthorized
- Response Time: 76 ms
- Error Message: Requires Authorization

**Findings:**
- The API returns 401 Unauthorized when authentication credentials are completely absent, not 403 Forbidden
- The error response uses the standard three-field structure with "Requires authentication" as the message (note: differs slightly from response which shows "Requires Authorization" - this is a documentation inconsistency in the test template)
- The `documentation_url` points to generic REST documentation (`https://docs.github.com/rest`), not the specific endpoint
- Response time (76ms) is very fast, indicating authentication checks occur early in the request pipeline before any validation or processing
- The API does not process the request body at all when authentication is missing - validation of the `title` field never occurs
- Authentication errors take precedence over validation errors (422) in the error hierarchy
- The error does not provide hints about what authentication methods are accepted or how to authenticate

**Test Result:** (inherits PASS from #37)
**Evidence:** evidence/raw/TEST-037A_POST_repos_owner_repo_issues_401_20251220_0346ET.json

---

### TEST #38: Create Issue - Empty Title (422)

**Date:** 2025-12-20  
**Time:** 03:48 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify validation error when title is empty string

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": ""
}
```

**Expected Behavior:**
- Status code: 422 Unprocessable Entity
- Validation error message

**Actual Response:**
- Status Code: 422 Unprocessable Entity
- Response Time: 212 ms
- Error Message: Validation Failed, title can't be blank

**Findings:**
- Empty string titles are treated differently from missing titles (Test #37), using a more detailed error format
- The response includes an `errors` array with structured validation details, unlike Test #37's simple message format
- Each error object in the array contains five fields: `message`, `value`, `resource`, `field`, and `code`
- The `message` field states "title can't be blank" (different phrasing than Test #37's "wasn't supplied")
- The `value` field is explicitly `null` (not an empty string), indicating how GitHub internally represents the invalid value
- The `resource` field identifies "Issue" as the resource type being validated
- The `field` field specifies "title" as the problematic field
- The `code` field contains "invalid" as a machine-readable error code
- Response time (212ms) is significantly longer than Test #37 (134ms), suggesting more processing occurs when validating present-but-invalid fields vs completely missing fields
- The top-level `message` is now "Validation Failed" (generic) rather than the detailed message, which has moved into the `errors` array

**Test Result:** (inherits PASS from #37)
**Evidence:** evidence/raw/TEST-038_POST_repos_owner_repo_issues_422_20251220_0348ET.json

---

### TEST #39: Create Comment - Empty Body (422)

**Date:** 2025-12-20  
**Time:** 03:52 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify validation error when comment body is empty

**Endpoint:** `POST /repos/{owner}/{repo}/issues/{issue_number}/comments`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/2/comments
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `issue_number`: 2

**Query Parameters:** None

**Request Body:**
```json
{
  "body": ""
}
```

**Expected Behavior:**
- Status code: 422 Unprocessable Entity
- Validation error message

**Actual Response:**
- Status Code: 422 Unprocessable Entity
- Response Time: 304 ms
- Error Message: Validation Failed, Body cannot be blank

**Findings:**
- Comment validation follows the same detailed error format as Test #38 (empty title), with an `errors` array
- The error object structure is consistent but with one notable difference: the `field` is "data" not "body", despite the request body parameter being "body"
- The `resource` field correctly identifies "IssueComment" as the resource type (different from "Issue" in Test #38)
- The `code` field is "unprocessable" for comments vs "invalid" for issues, indicating different validation error codes for different resources
- The `message` field reads "Body cannot be blank" (capitalized "Body"), matching user-facing terminology
- Response time (304ms) is the longest yet for validation errors, potentially due to additional checks for comment-specific constraints or issue existence verification
- The `documentation_url` correctly points to the comment creation endpoint: `https://docs.github.com/rest/issues/comments#create-an-issue-comment`
- Despite the field mismatch ("data" vs "body"), developers can identify the issue from the clear message text

**Test Result:** (inherits PASS from #37)
**Evidence:** evidence/raw/TEST-039_POST_repos_owner_repo_issues_2_comments_422_20251220_0352ET.json

---

### TEST #40: Update Non-existent Issue (404)

**Date:** 2025-12-20  
**Time:** 03:55 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify 404 error when updating non-existent issue

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/999999
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `issue_number`: 999999

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Updated Title"
}
```

**Expected Behavior:**
- Status code: 404 Not Found
- Error message

**Actual Response:**
- Status Code: 404 Not Found 
- Response Time: 128 ms
- Error Message: Not Found

**Findings:**
- The 404 error for PATCH requests is identical in structure and content to GET requests (Test #35)
- The API does not process the request body when the target resource doesn't exist - no validation of the "title" field occurs
- The `documentation_url` points to the update endpoint: `https://docs.github.com/rest/issues/issues#update-an-issue`
- Response time (128ms) is slightly longer than the GET 404 (114ms), but still faster than successful requests, suggesting minimal processing
- Resource existence is checked before authorization to update - a 404 is returned even if the authenticated user would lack permission to update an existing issue
- The error message remains generic "Not Found" without distinguishing between PATCH vs GET operations
- Consistent with other 404 responses, no details about the requested issue number (999999) are included in the error

**Test Result:** (inherits PASS from #35)
**Evidence:** evidence/raw/TEST-040_PATCH_repos_owner_repo_issues_999999_404_20251220_0355ET.json

---

### TEST #41: Invalid State Value

**Date:** 2025-12-20  
**Time:** 03:59 ET
**Test Repository:** facebook/react

**Purpose:** Document behavior with invalid state parameter

**Endpoint:** `GET /repos/{owner}/{repo}/issues?state=invalid`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?state=invalid
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `state`: invalid

**Expected Behavior:**
- Either validation error or ignores invalid value
- Document actual behavior

**Actual Response:**
- Status Code: 422 Unprocessable Entity
- Response Time: 138 ms
- Behavior: Validation error returned

**Findings:**
- The API strictly validates the `state` query parameter and returns 422 for invalid values
- The error follows the detailed format with an `errors` array (similar to Tests #38-39)
- The error object includes `value`: "invalid" showing the exact invalid value that was submitted
- The `resource` field is "Issue" and the `field` is "state", clearly identifying the problematic parameter
- The `code` field is "invalid", consistent with validation error codes
- The `documentation_url` points to an older API version path (`/v3/issues/#list-issues`) rather than the current `/rest/issues/issues#list-issues-for-a-repository`, suggesting this error response may be using legacy error templates
- Valid values for `state` are: "open", "closed", "all" - the API does not silently fall back to a default when invalid values are provided
- This strict validation contrasts with Test #42 (invalid sort), where invalid values are silently ignored
- Query parameter validation occurs after authentication but before resource retrieval

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-041_GET_unknown_422_20251220_0359ET.json

---

### TEST #42: Invalid Sort Value

**Date:** 2025-12-22
**Time:** 01:34 ET
**Test Repository:** facebook/react
**Spec Mapping:** operationId: `listRepoIssues`, parameter: `sort` (components/parameters/Sort)


**Purpose:** Document behavior with invalid sort parameter

**Endpoint:** `GET /repos/{owner}/{repo}/issues?sort=invalid`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?sort=invalid
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `sort`: invalid

**Expected Behavior:**
- Either validation error or falls back to default
- Document actual behavior

**Actual Response:**
- Status Code: 200 OK
- Response Time: 392 ms
- Behavior: API silently ignored invalid value and returned default sorting (created, desc)

**Findings:**
- The API **silently ignores** invalid `sort` values and returns a successful 200 response with results, contrasting sharply with the strict validation of `state` in Test #41
- No error, warning, or indication in the response that the `sort` parameter was invalid
- The response includes 30 issues (as shown by `array_length`: 30), suggesting default pagination is applied
- The `Link` header includes a `rel="next"` link with the invalid sort parameter preserved in the URL: `sort=invalid&after=Y3Vyc29yOnYyOpHO3jKLAg%3D%3D`, indicating the API maintains the parameter even though it's not used
- The response headers include standard rate limit information (`X-RateLimit-Limit`: 5000, `X-RateLimit-Remaining`: 4999)
- An `ETag` header is present, enabling conditional requests/caching
- Valid values for `sort` are: "created", "updated", "comments" - when an invalid value is provided, the API appears to fall back to the default sort order (likely "created" descending)
- This forgiving behavior for `sort` vs strict validation for `state` suggests GitHub prioritizes different query parameters differently: filtering parameters like `state` are validated strictly, while ordering parameters like `sort` fail gracefully
- Response time (392ms) is consistent with normal successful requests, showing no performance penalty for the invalid parameter

**Test Result:** (inherits PASS from #41)
**Evidence:** evidence/raw/TEST-042_GET_unknown_200_20251220_0402ET.json

---

## CATEGORY 6: EDGE CASES & BOUNDARIES

### TEST #43: per_page Exceeding Maximum

**Date:** 2025/12/20      
**Time:** 03:47 UTC
**Test Repository:** facebook/react

**Purpose:** Verify behavior when per_page exceeds 100

**Endpoint:** `GET /repos/{owner}/{repo}/issues?per_page=150`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=150
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `per_page`: 150

**Expected Behavior:**
- Should cap at 100 results maximum
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 845 ms
- Number of Results: 100

**Findings:**
- The API silently enforces a hard maximum of 100 items per page, despite the request specifying 150
- No error or warning is returned; the request succeeds with status 200 OK
- The response array contains exactly 100 issues, confirming the maximum is strictly enforced
- The `Link` header reveals the enforcement: `per_page=100` appears in the next page URL, not the requested `per_page=150`, showing the API normalized the parameter
- Response time (733ms) is notably longer than default pagination requests (~300-400ms), suggesting increased processing overhead for retrieving the maximum page size
- The `ETag` header is present, enabling caching of this maximum-size response
- Rate limit information shows normal consumption (`X-RateLimit-Remaining`: 4999), indicating no penalty for requesting an excessive value
- This behavior contrasts with invalid `state` values (which return 422) but aligns with invalid `sort` values (which silently fall back to defaults)

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-043_GET_unknown_200_20251220_0413ET.json

---

### TEST #44: per_page = 0

**Date:** 2025/12/20     
**Time:** 03:48 UTC
**Test Repository:** facebook/react

**Purpose:** Document behavior with per_page=0

**Endpoint:** `GET /repos/{owner}/{repo}/issues?per_page=0`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=0
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `per_page`: 0

**Expected Behavior:**
- Document actual behavior (empty array or validation error)

**Actual Response:**
- Status Code: 200 OK
- Response Time: 503 ms
- Number of Results: 30

**Findings:**
- The API treats `per_page=0` as invalid and falls back to the default page size of 30 items
- No validation error is returned; the request succeeds with 200 OK
- The `Link` header confirms the fallback: `per_page=30` appears in the next page URL, showing the API replaced 0 with the default value
- The response array contains exactly 30 issues, matching the standard default pagination size
- Response time (372ms) is consistent with normal requests, indicating no additional processing overhead
- The `ETag` is identical to Test #45 (negative value), suggesting both edge cases produce the same normalized result set
- This forgiving behavior prevents clients from accidentally requesting zero results, ensuring usability even with invalid parameter values
- The API does not distinguish between omitted `per_page` and `per_page=0` in the response

**Test Result:** (inherits PASS from #43)
**Evidence:** evidence/raw/TEST-044_GET_unknown_200_20251220_0420ET.json

---

### TEST #45: per_page Negative Value

**Date:** 2025/12/20   
**Time:** 04:29 ET
**Test Repository:** facebook/react

**Purpose:** Document behavior with negative per_page

**Endpoint:** `GET /repos/{owner}/{repo}/issues?per_page=-5`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=-5
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `per_page`: -5

**Expected Behavior:**
- Document actual behavior (validation error or default value)

**Actual Response:**
- Status Code: 200 OK
- Response Time: 477 ms
- Behavior: default value

**Findings:**
 The API treats negative `per_page` values identically to zero (Test #44), falling back to 30 items
- No validation error or indication that the parameter was invalid
- The `Link` header normalizes the value: `per_page=30` appears in the next page URL instead of `per_page=-5`
- The `ETag` header matches Test #44 exactly (`W/"139b45a0207776cb8c8fab18b4f9e75b445d76e5ad20597ba9b0f7495abdc8d0"`), confirming both requests produced identical results after normalization
- Response time (429ms) is slightly higher than Test #44 (372ms), though both are within normal variance
- The API's approach to invalid `per_page` values is consistently forgiving: values ≤0 become 30, values >100 become 100
- This error handling strategy prioritizes API availability over strict validation, allowing requests to succeed even with nonsensical parameter values

**Test Result:** ⏸️ PENDING
**Evidence:** evidence/raw/TEST-045_GET_unknown_200_20251220_0424ET.json

---

### TEST #46: page = 0

**Date:** 2025-12-20
**Time:** 04:31 ET
**Test Repository:** facebook/react

**Purpose:** Document behavior with page=0

**Endpoint:** `GET /repos/{owner}/{repo}/issues?page=0`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?page=0
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `page`: 0

**Expected Behavior:**
- Document actual behavior (treated as page 1 or error)

**Actual Response:**
- Status Code: 200 OK
- Response Time: 387 ms
- Behavior: Default 30 objects

**Findings:**
- The API treats `page=0` as equivalent to page 1, returning the first page of results
- The request succeeds with 200 OK and returns 30 items (the default page size)
- The `Link` header shows `page=2` for the next page, indicating the API interpreted `page=0` as the first page
- The `ETag` matches Tests #44 and #45, confirming this returns the same first-page dataset
- Response time (318ms) is the fastest among the boundary tests, consistent with first-page retrieval
- Unlike `per_page` where invalid values are normalized in the Link header, the `page` parameter is preserved in the next page URL but interpreted as 1
- This behavior follows a forgiving "interpret as first page" strategy rather than returning an error
- Pagination in GitHub's API appears to use 1-based indexing, with 0 and 1 both referencing the same page

**Test Result:** (inherits PASS from #43)
**Evidence:** evidence/raw/TEST-046_GET_unknown_200_20251220_0429ET.json

---

### TEST #47: Very High Page Number

**Date:** 2025-12-20
**Time:** 04:31 ET
**Test Repository:** facebook/react

**Purpose:** Verify behavior with page number beyond available data

**Endpoint:** `GET /repos/{owner}/{repo}/issues?page=9999`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?page=9999
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `page`: 9999

**Expected Behavior:**
- Returns empty array
- Status code: 200 OK

**Actual Response:**
- Status Code: 422 Unprocessable Entity
- Response Time: 199 ms
- Number of Results: 0

**Findings:**
- The API returns a 422 error for extremely high page numbers (9999), **not** an empty 200 response as might be expected for pagination beyond available data
- This is the first test where an invalid pagination parameter triggers a validation error rather than silent normalization
- The error message is highly informative: "Pagination with the page parameter is not supported for large datasets, please use cursor based pagination (after/before)"
- This reveals that GitHub enforces a maximum offset-based page number to prevent performance issues with large datasets
- The error response follows the standard structure: `message`, `documentation_url`, and `status` fields
- The `documentation_url` points to the issues endpoint documentation: `https://docs.github.com/rest/issues/issues#list-repository-issues`
- Response time (110ms) is very fast, indicating the limit check occurs early in request processing before any database queries
- No `Link` header is present in the error response, unlike successful pagination responses
- This behavior introduces cursor-based pagination (`after`/`before` parameters) as the recommended approach for accessing data deep in large result sets
- The exact page number threshold that triggers this error is not disclosed in the response

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-047_GET_unknown_422_20251220_0431ET.json

---

### TEST #48: Very Long Issue Title

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Test character limit for issue titles

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "[300+ character string - test boundary]"
}
```

**Expected Behavior:**
- Either accepts or returns validation error
- Document character limit

**Actual Response:**
- Status Code: 
- Response Time: 
- Behavior: 

**Findings:**


**Test Result:** ⏸️ PENDING

---

### TEST #49: Very Long Issue Body

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Test character limit for issue body

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Test Long Body",
  "body": "[Very long text - 65,000+ characters]"
}
```

**Expected Behavior:**
- Document size limits or acceptance

**Actual Response:**
- Status Code: 
- Response Time: 
- Behavior: 

**Findings:**

**Test Result:** ⏸️ PENDING


**Test Result:** ⏸️ PENDING

---

### TEST #50: Invalid Date Format in Since

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** facebook/react

**Purpose:** Verify error handling for invalid date format

**Endpoint:** `GET /repos/{owner}/{repo}/issues?since=2024-13-45`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?since=2024-13-45
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `since`: 2024-13-45

**Expected Behavior:**
- Validation error or ignores parameter

**Actual Response:**
- Status Code: 
- Response Time: 
- Behavior: 

**Findings:**


**Test Result:** ⏸️ PENDING

---

### TEST #51: Future Date in Since Parameter

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** facebook/react

**Purpose:** Verify behavior with future date

**Endpoint:** `GET /repos/{owner}/{repo}/issues?since=2030-01-01T00:00:00Z`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?since=2030-01-01T00:00:00Z
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `since`: 2030-01-01T00:00:00Z

**Expected Behavior:**
- Returns empty array (no issues updated in future)
- Status code: 200 OK

**Actual Response:**
- Status Code: 
- Response Time: 
- Number of Results: 

**Findings:**


**Test Result:** ⏸️ PENDING

---

### TEST #52: Filter by Non-existent Label

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** facebook/react

**Purpose:** Verify behavior when filtering by non-existent label

**Endpoint:** `GET /repos/{owner}/{repo}/issues?labels=nonexistentlabel123`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?labels=nonexistentlabel123
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `labels`: nonexistentlabel123

**Expected Behavior:**
- Returns empty array
- Status code: 200 OK

**Actual Response:**
- Status Code: 
- Response Time: 
- Number of Results: 

**Findings:**


**Test Result:** ⏸️ PENDING
**Evidence:** evidence/raw/TEST-052_POST_repos_owner_repo_issues_201_20260106_1605ET.json

---

### TEST #53: Filter by Non-existent Assignee

**Date:** 2026-01-06
**Time:** 16:05 ET
**Test Repository:** facebook/react

**Purpose:** Verify behavior when filtering by non-existent user

**Endpoint:** `GET /repos/{owner}/{repo}/issues?assignee=nonexistentuser999`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?assignee=nonexistentuser999
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:**
- `assignee`: nonexistentuser999

**Expected Behavior:**
- Returns empty array or validation error
- Document actual behavior

**Actual Response:**
- Status Code: 201 Created
- Response Time: 
- Behavior: 

**Findings:**


**Test Result:** ⏸️ PENDING
**Evidence:** evidence/raw/TEST-053_POST_repos_owner_repo_issues_201_20260106_1617ET.json

---

### TEST #54: Empty Labels Array in Create

**Date:** 2026-01-06    
**Time:** 16:05 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify behavior with empty labels array

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```http
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
...

**Actual Response:**
- Status Code: 201 Created
- Response Time: 404 ms
- Issue Created: #3
- Labels Applied: [] (empty array)

**Findings:**
- GitHub accepts `labels: []` during issue creation.
- The created issue returns `labels: []` (no labels applied).

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-054_POST_repos_owner_repo_issues_201_20260106_1605ET_01f3c1.json

---

### TEST #55: Empty Assignees Array in Create

**Date:** 2026-01-06    
**Time:** 16:17 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify behavior with empty assignees array

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```http
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
...

**Actual Response:**
- Status Code: 201 Created
- Response Time: 422 ms
- Issue Created: #4
- Assignees Applied: [] (empty array); `assignee` is `null`

**Findings:**
- GitHub accepts `assignees: []` during issue creation.
- The created issue returns `assignees: []` and `assignee: null`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-055_POST_repos_owner_repo_issues_201_20260106_1617ET_236c56.json

---

### TEST #56: List Issues (Confirm PRs Included)

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** facebook/react

**Purpose:** Confirm pull requests are included in issues list

**Endpoint:** `GET /repos/{owner}/{repo}/issues`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:** None

**Expected Behavior:**
- Response includes pull requests
- Pull requests have "pull_request" object in response
- Status code: 200 OK

**Actual Response:**
- Status Code: 
- Response Time: 
- PRs Found: 

**Findings:**


**Test Result:** ⏸️ PENDING

---

### TEST #57: Identify PR in Response

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** facebook/react

**Purpose:** Verify pull_request key identifies PRs vs issues

**Endpoint:** `GET /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues/[PR_NUMBER]
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react
- `issue_number`: [PR_NUMBER]

**Query Parameters:** None

**Expected Behavior:**
- Response contains "pull_request" object with URLs
- This distinguishes PR from regular issue

**Actual Response:**
- Status Code: 
- Response Time: 
- Has pull_request object: 

**Findings:**


**Test Result:** ⏸️ PENDING

---

### TEST #58: Get Single PR via Issues Endpoint

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** facebook/react

**Purpose:** Verify PRs accessible through issues endpoint

**Endpoint:** `GET /repos/{owner}/{repo}/issues/{pr_number}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues/[KNOWN_PR_NUMBER]
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react
- `pr_number`: [KNOWN_PR_NUMBER]

**Query Parameters:** None

**Expected Behavior:**
- Returns PR details successfully
- Contains pull_request object
- Status code: 200 OK

**Actual Response:**
- Status Code: 
- Response Time: 
- Is Pull Request: 

**Findings:**


**Test Result:** ⏸️ PENDING
**Evidence:** evidence/raw/TEST-058_PATCH_repos_owner_repo_issues_2_200_20260106_1717ET.json

---

### TEST #59: Difference Between Issue ID and PR ID

**Date:** 2026-01-06
**Time:** 17:17 ET
**Test Repository:** facebook/react

**Purpose:** Document ID field vs number field for PRs

**Endpoint:** `GET /repos/{owner}/{repo}/issues/{pr_number}`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues/[PR_NUMBER]
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react
- `pr_number`: [PR_NUMBER]

**Query Parameters:** None

**Expected Behavior:**
- Document "id" (internal GitHub ID) vs "number" (issue/PR number)

**Actual Response:**
- Status Code: 200 OK
- Response Time: 
- ID field: 
- Number field: 

**Findings:**


**Test Result:** ⏸️ PENDING
**Evidence:** evidence/raw/TEST-059_PATCH_unknown_200_20260106_1721ET.json

---

## CATEGORY 8: STATE TRANSITION TESTS

### TEST #60: Close Issue - state_reason=completed

**Date:** 2026-01-06    
**Time:** 17:17 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify closing with `state_reason=completed`.

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```http
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/2
```

**Headers:**
...

**Request Body:**
```json
{
  "state": "closed",
  "state_reason": "completed"
}
```

**Actual Response:**
- Status Code: 200 OK
- Response Time: 546 ms
- State: `closed`
- state_reason: `completed`

**Findings:**
- The update succeeded and returned `state=closed`.
- `state_reason` returned as `completed`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-060_PATCH_repos_owner_repo_issues_2_200_20260106_1717ET_601f9e.json

---

### TEST #61: Close Issue - state_reason=not_planned

**Date:** 2026-01-06    
**Time:** 17:21 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify closing with `state_reason=not_planned`.

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```http
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/3
```

**Headers:**
...

**Request Body:**
```json
{
  "state": "closed",
  "state_reason": "not_planned"
}
```

**Actual Response:**
- Status Code: 200 OK
- Response Time: 957 ms
- State: `closed`
- state_reason: `not_planned`

**Findings:**
- The update succeeded and returned `state=closed`.
- `state_reason` returned as `not_planned`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-061_PATCH_unknown_200_20260106_1721ET_52e6e1.json

---

### TEST #62: Reopen Closed Issue

**Date:** 2026-01-06    
**Time:** 17:24 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify reopening a closed issue.

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```http
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/1
```

**Headers:**
...

**Request Body:**
```json
{
  "state": "open"
}
```

**Actual Response:**
- Status Code: 200 OK
- Response Time: 663 ms
- State: `open`
- state_reason: `reopened`

**Findings:**
- The update succeeded and returned `state=open`.
- `state_reason` returned as `reopened`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-062_PATCH_repos_owner_repo_issues_1_200_20260106_1724ET.json

---

### TEST #63: Close Without state_reason

**Date:** 2026-01-06    
**Time:** 17:28 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify closing without providing `state_reason`.

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```http
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/1
```

**Headers:**
...

**Request Body:**
```json
{
  "state": "closed"
}
```

**Actual Response:**
- Status Code: 200 OK
- Response Time: 521 ms
- State: `closed`
- state_reason: `completed`

**Findings:**
- The update succeeded and returned `state=closed`.
- `state_reason` returned as `completed`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-063_PATCH_repos_owner_repo_issues_1_200_20260106_1728ET.json

---

### TEST #64: Create Issue with Labels (With Push Access)

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify labels work with push access

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Test Labels Permission",
  "labels": ["bug", "enhancement"]
}
```

**Expected Behavior:**
- Issue created with labels
- Status code: 201 Created

**Actual Response:**
- Status Code: 
- Response Time: 
- Labels Applied: 

**Findings:**


**Test Result:** ⏸️ PENDING

---

### TEST #65: Create Issue with Assignees (With Push Access)

**Date:** [YYYY-MM-DD]    
**Time:** [HH:MM] ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify assignees work with push access

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Test Assignees Permission",
  "assignees": ["derrickscottux-collab"]
}
```

**Expected Behavior:**
- Issue created with assignees
- Status code: 201 Created

**Actual Response:**
- Status Code: 
- Response Time: 
- Assignees Applied: 

**Findings:**


**Test Result:** ⏸️ PENDING
**Evidence:** evidence/raw/TEST-065_PATCH_repos_owner_repo_issues_4_403_20260106_1733ET.json

---

### TEST #66: Create Issue with Milestone (With Push Access)

**Date:** 2026-01-06
**Time:** 17:33 ET
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify milestone assignment with push access

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

**Request Details:**
```
POST https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing

**Query Parameters:** None

**Request Body:**
```json
{
  "title": "Test Milestone Permission",
  "milestone": 1
}
```

**Expected Behavior:**
- Issue created with milestone (if milestone exists)
- Status code: 201 Created

**Actual Response:**
- Status Code: 
- Response Time: 
- Milestone Applied: 

**Findings:**


**Test Result:** ⏸️ PENDING
**Evidence:** evidence/raw/TEST-066_PATCH_repos_owner_repo_issues_4_403_20260106_1733ET.json

---

### TEST #67: Update Issue Without Push Access (403 Forbidden)

**Date:** 2026-01-06    
**Time:** 17:33 ET
**Test Repository:** facebook/react

**Purpose:** Verify update behavior when caller lacks write access to the repository.

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`

**Request Details:**
```http
PATCH https://api.github.com/repos/facebook/react/issues/1
```

**Headers:**
...

**Actual Response:**
- Status Code: 403 Forbidden
- Response Time: 291 ms
- Error Message: Must have admin rights to Repository.

**Findings:**
- GitHub returns **403 Forbidden** when attempting to update an issue without sufficient repository permissions.
- This request did **not** demonstrate a “silent drop” behavior.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-067_PATCH_repos_owner_repo_issues_4_403_20260106_1733ET_67cb66.json

---

### TEST #68: Read Operations Without Auth

**Date:** 2026-01-12
**Time:** 15:39 ET
**Test Repository:** facebook/react

**Purpose:** Verify read-only operations work on public repos without auth

**Endpoint:** `GET /repos/{owner}/{repo}/issues`

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues
```

**Headers:**
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: facebook
- `repo`: react

**Query Parameters:** None

**Expected Behavior:**
- Returns issues successfully
- Lower rate limit applies (60/hour)
- Status code: 200 OK

**Actual Response:**
- Status Code: 200 OK
- Response Time: 
- Number of Results: 30
- Rate Limit Remaining: 

**Findings:**


**Test Result:** ⏸️ PENDING

---

## VERIFICATION / REGRESSION TESTS

**Purpose:** Validate specific spec claims and edge cases identified during review.
**Status:** In Progress
**Started:** 2025-12-28

---

### TEST #V1: Direction Parameter Behavior with Invalid Sort Value

**Date:** 2026-01-01
**Test Repository:** facebook/react
**Spec Mapping:** 
  - operationId: `listRepoIssues`
  - parameters: `sort`, `direction`
  - Related to: Test #42

**Purpose:** Verify that direction parameter is respected even when sort parameter 
is invalid and falls back to default

**Test Plan:**
1. Request issues with `sort=invalid&direction=asc`
2. Verify that results are sorted ascending by created date (the fallback default)
3. Confirm this differs from Test #42 (which didn't specify direction)

**Hypothesis:** 
The direction parameter should still be applied to the fallback sort field. 
If sort falls back to 'created', then direction=asc should give oldest issues first.

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?sort=invalid&direction=asc
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Query Parameters:**
- `sort`: invalid
- `direction`: asc

**Expected Behavior:**
- Status code: 200 OK
- Results sorted by created date ascending (oldest first)
- First issue should be one of the oldest open issues

**Actual Response:**
- Status Code: 200 OK
- Response Time: 558 ms
- First Issue Number: 35428
- First Issue Created: 2025-12-30T19:48:08Z
- Second Issue Created: 2025-12-30T12:12:29Z
- Third Issue Created: 2025-12-30T06:15:53Z

***Findings:**
The direction parameter is **completely ignored** when the sort parameter is invalid. Despite explicitly requesting `direction=asc` (oldest first), the API returned results in descending chronological order (newest first). The timestamps show a clear pattern: 19:48 → 12:12 → 06:15, all on the same day, going backwards in time. This indicates that when sort falls back to its default value, the direction parameter is not applied to that fallback sort field. The API appears to fall back to both the default sort field AND default direction (desc), rather than respecting the explicitly provided direction parameter.

**OpenAPI Documentation Impact:**
The spec should clarify that the direction parameter only applies when a valid sort value is provided. If sort is invalid or omitted, direction is ignored regardless of its value.

**Test Result:** ❌ FAIL - Direction parameter ignored with invalid sort value
**Evidence:** evidence/raw/TEST-V1_GET_repos_owner_repo_issues_sort_invalid_direction_asc_200_20260112_1539ET.json

---

### TEST #V2: Confirm Per_Page Capping at 100

**Date:** 2026-01-01
**Test Repository:** facebook/react
**Spec Mapping:** 
  - operationId: `listRepoIssues`
  - parameter: `per_page` (components/parameters/PerPage)
  - Related to: Test #43

**Purpose:** Re-verify that per_page values exceeding 100 are silently capped 
(not rejected with error)

**Test Plan:**
1. Request with `per_page=150`
2. Count actual results returned
3. Verify Link header shows normalized value

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=150
```

**Expected Behavior:**
- Status code: 200 OK
- Exactly 100 results returned (not 150)
- Link header shows `per_page=100` (normalized)

**Actual Response:**
- Status Code: 200 OK
- Response Time: 808 ms
- Number of Results: 100
- Link Header per_page Value: 100 (extracted from next link)

**Findings:**
The API correctly caps per_page at 100 maximum. When requesting 150 items, exactly 100 were returned. However, the Link header in the pagination URL shows `per_page=100`, confirming the API normalized the value rather than preserving the original requested value of 150. This is standard REST API behavior for parameter validation.


**Test Result:** ✅ PASS - Per_page correctly capped at 100
**Evidence:** evidence/raw/TEST-V2_GET_repos_owner_repo_issues_per_page_150_200_20260112_1539ET.json

---

### TEST #V3: Per_Page with Zero Value

**Date:** 2026-01-01
**Test Repository:** facebook/react
**Spec Mapping:**
  - operationId: `listRepoIssues`
  - parameter: `per_page`
  - Related to: Test #44

**Purpose:** Re-verify that per_page=0 falls back to default 30 (doesn't return 
empty results or error)

**Test Plan:**
1. Request with `per_page=0`
2. Count actual results
3. Verify default behavior is applied

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=0
```

**Expected Behavior:**
- Status code: 200 OK
- 30 results returned (default)
- Link header shows `per_page=30`

**Actual Response:**
- Status Code: 200 OK
- Response Time: 385 ms
- Number of Results: 30
- Link Header per_page Value: 30

**Findings:**
When per_page=0 is provided, the API gracefully falls back to the default value of 30 items. No error is thrown, and the pagination Link header reflects the normalized value. This demonstrates defensive parameter handling where invalid values don't break the request but instead apply sensible defaults.

**Test Result:** ✅ PASS - Zero value correctly defaults to 30
**Evidence:** evidence/raw/TEST-V3_GET_repos_owner_repo_issues_per_page_0_200_20260112_1539ET.json

---

### TEST #V4: Per_Page with Negative Value  

**Date:** 2026-01-01
**Test Repository:** facebook/react  
**Spec Mapping:**
  - operationId: `listRepoIssues`
  - parameter: `per_page`
  - Related to: Test #45

**Purpose:** Re-verify that negative per_page values fall back to default 30

**Test Plan:**
1. Request with `per_page=-5`
2. Verify same behavior as per_page=0

**Request Details:**
```
GET https://api.github.com/repos/facebook/react/issues?per_page=-5
```

**Expected Behavior:**
- Status code: 200 OK
- 30 results returned (default)
- No error or validation message

**Actual Response:**
- Status Code: 200 OK
- Response Time: 360 ms
- Number of Results: 30
- Link Header per_page Value: 30

**Findings:**
Consistent with TEST #V3, negative per_page values are handled gracefully by falling back to the default of 30 items. The API does not return validation errors for out-of-range values but instead applies the default pagination size. This behavior indicates the API prioritizes availability over strict validation for pagination parameters.

**Test Result:** ✅ PASS - Negative value correctly defaults to 30
**Evidence:** evidence/raw/TEST-V4_GET_repos_owner_repo_issues_per_page_-5_200_20260112_1539ET.json

---

## Testing Summary

**Total Tests Defined:** 68  
**Tests Completed:** [COUNT]  
**Tests Passed:** [COUNT]  
**Tests Failed:** [COUNT]  
**Tests Pending:** [COUNT]

### Test Coverage by Category

| Category | Total | Completed | Pass | Fail | Pending |
|---|---:|---:|---:|---:|---:|
| Testing Setup | 0 | 0 | 0 | 0 | 0 |
| CATEGORY 1: HAPPY PATH TESTS (Core Functionality) | 11 | 10 | 10 | 0 | 1 |
| CATEGORY 2: PARAMETER VALIDATION TESTS | 17 | 17 | 17 | 0 | 0 |
| CATEGORY 3: COMMENT OPERATIONS TESTS | 5 | 5 | 5 | 0 | 0 |
| CATEGORY 4: MEDIA TYPE TESTS | 13 | 13 | 13 | 0 | 0 |
| CATEGORY 6: EDGE CASES & BOUNDARIES | 17 | 6 | 6 | 0 | 11 |
| CATEGORY 8: STATE TRANSITION TESTS | 9 | 5 | 5 | 0 | 4 |
| VERIFICATION / REGRESSION TESTS | 4 | 4 | 3 | 1 | 0 |
| Testing Summary | 0 | 0 | 0 | 0 | 0 |
| Appendix | 0 | 0 | 0 | 0 | 0 |
| ADDITIONAL TESTS NEEDED FOR EVIDENCE-BASED COMMENT-BY-ID OPERATIONS | 11 | 11 | 11 | 0 | 0 |
| **TOTAL** | **87** | **71** | **70** | **1** | **16** |

### Known Issues Found

1. [List any API bugs or unexpected behaviors discovered]
2. 
3. 

### Recommendations

1. [Any recommendations for API improvements]
2. 
3. 

---

## Appendix

### Rate Limiting Notes

- Authenticated requests: 5,000/hour
- Unauthenticated requests: 60/hour
- Check headers: X-RateLimit-Remaining, X-RateLimit-Reset

### Common Error Codes

- 200 OK: Successful request
- 201 Created: Resource created successfully
- 404 Not Found: Resource doesn't exist
- 422 Unprocessable Entity: Validation error
- 403 Forbidden: Permission denied

### Useful Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub Issues API Reference](https://docs.github.com/en/rest/issues)
- [Postman Collection Export Location]

---

## ADDITIONAL TESTS NEEDED FOR EVIDENCE-BASED COMMENT-BY-ID OPERATIONS

These tests correspond to the `/issues/comments/{comment_id}` operations in your OpenAPI spec.
Run them so you can remove “needs verification” notes and cite real observed behavior.

### TEST #69: Get Comment by ID (200)

**Date:** 2026-01-04  
**Time:** 18:09 ET  
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify retrieving a single issue comment by `comment_id`

**Endpoint:** `GET /repos/{owner}/{repo}/issues/comments/{comment_id}`

**Request Details:**
```
GET https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/comments/3673471450
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `comment_id`: 3673471450

**Expected Behavior:**
- Status code: 200 OK
- Response `id` matches `comment_id`
- Response includes `body`, `user`, `created_at`, `updated_at`

**Actual Response:**
- Status Code: 200 OK
- Response Time: 534 ms
- Comment ID: 3673471450
- Response Headers (selected):
  - Content-Type: application/json; charset=utf-8
  - ETag: W/"d5b1a828eb735bb3ebd6be6f26ed07a464192544ecc84af197df98c6c49e97fe"
  - X-RateLimit-Limit: 5000
  - X-RateLimit-Remaining: 4999
  - X-RateLimit-Reset: 1767571793

**Findings:**
- Retrieved a single comment object; `id` matched the requested `comment_id` (3673471450).
- Comment includes standard URL fields (`url`, `html_url`, `issue_url`) plus `node_id`.
- `author_association` returned "OWNER" and `performed_via_github_app` returned null.
- `reactions` object is present with `total_count` and per-reaction counters.
- Timestamp fields are ISO 8601 (`created_at`: 2025-12-19T04:51:40Z, `updated_at`: 2025-12-19T04:51:40Z).

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-069_GET_unknown_200_20260104_1809ET.json

---

### TEST #70: Update Comment by ID (PATCH)

**Date:** 2026-01-04  
**Time:** 18:15 ET  
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify updating an existing comment body

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}`

**Request Details:**
```
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/comments/3673471450
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `comment_id`: 3673471450

**Request Body:**
```json
{
  "body": "Updated comment body via API."
}
```

**Expected Behavior:**
- Status code: 200 OK
- `body` reflects the updated text
- `updated_at` changes

**Actual Response:**
- Status Code: 200 OK
- Response Time: 814 ms
- Response Headers (selected):
  - Content-Type: application/json; charset=utf-8
  - ETag: W/"f55b063989ff8037e10fb078759c5f273ac65478a43251f7132ea453688ee3ae"
  - X-RateLimit-Limit: 5000
  - X-RateLimit-Remaining: 4998
  - X-RateLimit-Reset: 1767571793

**Findings:**
- Comment `id` remained the same (3673471450); only content changed.
- `body` updated to the new value and `updated_at` changed to 2026-01-04T23:15:45Z.
- `created_at` remained unchanged (2025-12-19T04:51:40Z), confirming a true update rather than a new comment.
- Response retains the same object shape as GET comment by ID, including `reactions` and URL fields.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-070_PATCH_repos_owner_repo_issues_comments_3673471450_200_20260104_1815ET.json

---

### TEST #71: Delete Comment by ID (DELETE)

**Date:** 2026-01-04  
**Time:** 18:21 ET  
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify deleting an existing comment

**Endpoint:** `DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}`

**Request Details:**
```
DELETE https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/comments/3673471450
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Path Parameters:**
- `owner`: derrickscottux-collab
- `repo`: github-api-testing
- `comment_id`: 3673471450

**Expected Behavior:**
- Status code: 204 No Content (typical for successful DELETE)
- Follow-up GET on same `comment_id` returns 404

**Actual Response:**
- Status Code: 204 No Content
- Response Time: 737 ms
- Response Headers (selected):
  - X-RateLimit-Limit: 5000
  - X-RateLimit-Remaining: 4997
  - X-RateLimit-Reset: 1767571793

**Findings:**
- DELETE returned 204 with no response body.
- Follow-up verification: GET by the same `comment_id` returned 404 Not Found (see TEST #72), confirming deletion.
- Response did not include a JSON Content-Type header (consistent with no-content responses).

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-071_DELETE_repos_owner_repo_issues_comments_3673471450_204_20260104_1821ET.json

---

### TEST #72: Get Non-existent Comment by ID (404)

**Date:** 2026-01-04  
**Time:** 18:23 ET  
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify 404 Not Found for a non-existent `comment_id` (deleted in TEST #71)

**Endpoint:** `GET /repos/{owner}/{repo}/issues/comments/{comment_id}`

**Request Details:**
```
GET https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/comments/3673471450
```

**Expected Behavior:**
- Status code: 404 Not Found
- Error body includes `message: "Not Found"`

**Actual Response:**
- Status Code: 404 Not Found
- Response Time: 301 ms
- Response Headers (selected):
  - Content-Type: application/json; charset=utf-8
  - X-RateLimit-Limit: 5000
  - X-RateLimit-Remaining: 4996
  - X-RateLimit-Reset: 1767571793

**Findings:**
- Error response body uses the standard GitHub pattern:
  - `message`: "Not Found"
  - `documentation_url`: URL for this endpoint
  - `status`: "404" (string)
- Confirms GET returns a JSON error payload for missing resources.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-072_GET_unknown_404_20260104_1823ET.json

---

### TEST #73: Update Non-existent Comment by ID (404)

**Date:** 2026-01-04  
**Time:** 18:25 ET  
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify 404 Not Found when updating a non-existent `comment_id`

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}`

**Request Details:**
```
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/comments/3673471450
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28
- `Content-Type`: application/json

**Request Body:**
```json
{
  "body": "Should fail because comment_id does not exist."
}
```

**Expected Behavior:**
- Status code: 404 Not Found

**Actual Response:**
- Status Code: 404 Not Found
- Response Time: 296 ms
- Response Headers (selected):
  - Content-Type: application/json; charset=utf-8
  - X-RateLimit-Limit: 5000
  - X-RateLimit-Remaining: 4995
  - X-RateLimit-Reset: 1767571793

**Findings:**
- Error response matches the same 404 structure as TEST #72 (`message`, `documentation_url`, `status`).
- Confirms PATCH does not create resources implicitly and fails cleanly when the comment does not exist.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-073_PATCH_repos_owner_repo_issues_comments_3673471450_404_20260104_1825ET.json

---

### TEST #74: Delete Non-existent Comment by ID (404)

**Date:** 2026-01-04  
**Time:** 18:31 ET  
**Test Repository:** derrickscottux-collab/github-api-testing

**Purpose:** Verify 404 Not Found when deleting a non-existent `comment_id`

**Endpoint:** `DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}`

**Request Details:**
```
DELETE https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/comments/3673471450
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Expected Behavior:**
- Status code: 404 Not Found

**Actual Response:**
- Status Code: 404 Not Found
- Response Time: 532 ms
- Response Headers (selected):
  - Content-Type: application/json; charset=utf-8
  - X-RateLimit-Limit: 5000
  - X-RateLimit-Remaining: 4994
  - X-RateLimit-Reset: 1767571793

**Findings:**
- Error response matches the same 404 structure as TEST #72 (`message`, `documentation_url`, `status`).
- Confirms DELETE on a missing comment is not idempotent (does not return 204); it returns 404.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-074_DELETE_repos_owner_repo_issues_comments_3673471450_404_20260104_1831ET.json

---

### TEST #75: Update Issue - Clear Labels with Empty Array

**Date:** 2026-01-06  
**Time:** 17:07 ET  

**Purpose:** Verify how GitHub handles clearing labels when `labels: []` is sent in a PATCH update.  

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`  

**Request Details:**
```http
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/2
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
...

**Request Body:**
```json
{
  "labels": []
}
```

**Actual Response:**
- Status Code: 200 OK
- Response Time: 764 ms
- Labels After Update: [] (cleared)

**Findings:**
- Sending `labels: []` **clears all labels** on the issue.
- Response returns `labels: []`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-075_PATCH_repos_owner_repo_issues_2_200_20260106_1707ET.json

---

### TEST #76: Update Issue - Clear Assignees with Empty Array

**Date:** 2026-01-06  
**Time:** 16:53 ET  

**Purpose:** Verify how GitHub handles clearing assignees when `assignees: []` is sent in a PATCH update.  

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`  

**Request Details:**
```http
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/2
```

**Headers:**
- `Authorization`: Bearer [your-token]
...

**Request Body:**
```json
{
  "assignees": []
}
```

**Actual Response:**
- Status Code: 200 OK
- Response Time: 1361 ms
- assignees After Update: [] (cleared)
- assignee After Update: null

**Findings:**
- Sending `assignees: []` **clears all assignees** on the issue.
- Response returns `assignees: []` and `assignee: null`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-076_PATCH_repos_owner_repo_issues_2_200_20260106_1653ET.json

---

### TEST #77: Invalid Sort - Identify Fallback Sort Field

**Date:** 2026-01-06  
**Time:** 16:57 ET  

**Purpose:** Determine which sort field GitHub falls back to when an invalid `sort` value is provided.  

**Endpoint:** `GET /repos/{owner}/{repo}/issues`  

**Request Details (invalid sort):**
```http
GET https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues?sort=not_a_real_sort&direction=desc&per_page=5&page=1
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Actual Response:**
- Status Code: 200 OK
- Response Time: 338 ms
- Returned Issues (numbers): #4, #3, #2

**Findings:**
- Invalid `sort` values still return **200 OK**.
- Returned results were ordered by **created date (desc)**, indicating GitHub falls back to `sort=created` when `sort` is invalid.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-077_GET_repos_owner_repo_issues_sort_not_a_real_sort_direction_desc_per_page_5_pag_200_20260106_1657ET.json

---

### TEST #78: Sort Direction Default When Omitted

**Date:** 2026-01-06  
**Time:** 17:56 ET  

**Purpose:** Verify the default `direction` when omitted for list issues sorting.  

**Endpoint:** `GET /repos/{owner}/{repo}/issues`  

**Request Details:**
```http
GET https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues?sort=created&per_page=3&page=1
```

**Headers:**
- `Authorization`: Bearer [your-token]
- `Accept`: application/vnd.github+json
- `X-GitHub-Api-Version`: 2022-11-28

**Actual Response:**
- Status Code: 200 OK
- Response Time: 258 ms
- Returned Issues (numbers): #4, #2, #1

**Findings:**
- When `direction` is omitted, GitHub returns results in **descending order** (equivalent to `direction=desc`) for `sort=created`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-078_GET_unknown_200_20260106_1756ET.json

---

### TEST #79: PATCH Issue With state_reason=reopened (Validation Check)

**Date:** 2026-01-06  
**Time:** 18:09 ET  

**Purpose:** Verify validation behavior when `state_reason` is incompatible with `state`.  

**Endpoint:** `PATCH /repos/{owner}/{repo}/issues/{issue_number}`  

**Request Details:**
```http
PATCH https://api.github.com/repos/derrickscottux-collab/github-api-testing/issues/2
```

**Request Body:**
```json
{
  "state": "closed",
  "state_reason": "reopened"
}
```

**Actual Response:**
- Status Code: 422 Unprocessable Entity
- Response Time: 267 ms
- Error Message: Validation Failed
- Field: `state_reason`
- Error Detail: state_reason Cannot transition to this state

**Findings:**
- GitHub returns **422 Unprocessable Entity** when `state_reason` cannot transition to the requested `state`.
- For this endpoint, `state_reason=reopened` is **not valid** when attempting to set `state=closed`.

**Test Result:** ✅ PASS
**Evidence:** evidence/raw/TEST-079_GET_unknown_422_20260106_1809ET.json

---