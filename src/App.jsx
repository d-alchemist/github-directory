import { Link } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<main>
				<div class="container py-4">
					<header class="pb-3 mb-4 border-bottom">
						<h1 className="h4 mb-0">My GitHub Directory</h1>
					</header>
          <div className="position-relative">
            <div class="p-5 mb-4 bg-light rounded-3">
              <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Welcome 👋</h1>
                <img src="https://i.imgur.com/5f5GsU3.png" alt="astro mona" className="w-25 position-absolute top-0 end-0" />
              </div>
            </div>
          </div>
					<div class="row align-items-md-stretch">
						<div class="col-md-6">
							<div class="h-100 p-5 text-white bg-dark rounded-3">
								<h2>Users</h2>
								<p>
                  View all the users in the GitHub universe
								</p>
								<Link to="users">
									<button class="btn btn-outline-light" type="button">
										View Users
									</button>
								</Link>
							</div>
						</div>
						<div class="col-md-6">
							<div class="h-100 p-5 bg-light border rounded-3">
								<h2>Repositories</h2>
								<p>
                  View all the public repositories in GitHub
								</p>
								<Link to="repos">
									<button class="btn btn-outline-secondary" type="button">
										View Repositories
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
